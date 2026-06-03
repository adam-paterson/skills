#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  assertSkillName,
  domainMap,
  findAllSkillMarkdownFiles,
  isExpectedSkillPath,
  listDirSafe,
  listFilesRecursive,
  loadConfig,
  normalizeDescription,
  repoRoot,
  scanSkills,
  skillNamePattern
} from "./lib/catalog.mjs";

export async function validateCatalog(root = repoRoot) {
  const errors = [];
  const config = await loadConfig(root);
  const domains = domainMap(config);
  const skillsRoot = path.join(root, "skills");

  for (const domain of config.domains) {
    if (!skillNamePattern.test(domain.id)) {
      errors.push(`Invalid domain id in catalog.config.json: ${domain.id}`);
    }
  }

  const domainEntries = await listDirSafe(skillsRoot);
  const actualDomainDirs = domainEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const expectedDomainDirs = [...domains.keys()].sort();

  const unexpectedDomains = actualDomainDirs.filter((name) => !domains.has(name));
  const missingDomains = expectedDomainDirs.filter((name) => !actualDomainDirs.includes(name));
  for (const domain of unexpectedDomains) {
    errors.push(`Unexpected skills domain directory: skills/${domain}`);
  }
  for (const domain of missingDomains) {
    errors.push(`Missing skills domain directory: skills/${domain}`);
  }

  const skillFiles = await findAllSkillMarkdownFiles(root);
  for (const relativePath of skillFiles) {
    if (!isExpectedSkillPath(relativePath, config)) {
      errors.push(`Unsafe or undiscoverable SKILL.md path: ${relativePath}`);
    }
  }

  let skills = [];
  try {
    skills = await scanSkills(root);
  } catch (error) {
    errors.push(error.message);
  }

  const names = new Map();
  for (const skill of skills) {
    try {
      assertSkillName(skill.name, `${skill.relativeSkillFile} frontmatter name`);
    } catch (error) {
      errors.push(error.message);
    }

    if (skill.name !== skill.folderName) {
      errors.push(
        `${skill.relativeSkillFile} frontmatter name "${skill.name}" must match folder "${skill.folderName}".`
      );
    }

    if (!normalizeDescription(skill.description)) {
      errors.push(`${skill.relativeSkillFile} must define a non-empty description.`);
    }

    if (/todo/i.test(skill.description)) {
      errors.push(`${skill.relativeSkillFile} description still contains TODO text.`);
    }

    if (names.has(skill.name)) {
      errors.push(
        `Duplicate skill name "${skill.name}" in ${names.get(skill.name)} and ${skill.relativeSkillFile}.`
      );
    } else {
      names.set(skill.name, skill.relativeSkillFile);
    }

    await validateSkillReferences(root, skill, errors);
  }

  await validateSpecPackages(root, errors);

  return { errors, skillCount: skills.length };
}

async function validateSpecPackages(root, errors) {
  const specsRoot = path.join(root, "docs", "specs");
  const entries = await listDirSafe(specsRoot);
  const specDirs = entries.filter((entry) => entry.isDirectory());
  if (specDirs.length === 0) {
    return;
  }

  const workflowDoc = path.join(root, "docs", "agents", "spec-workflow.md");
  if (!(await exists(workflowDoc))) {
    errors.push("Spec packages require docs/agents/spec-workflow.md.");
  }

  const indexPath = path.join(specsRoot, "INDEX.md");
  let indexContent = "";
  if (await exists(indexPath)) {
    indexContent = await fs.readFile(indexPath, "utf8");
  } else {
    errors.push("Spec packages require docs/specs/INDEX.md.");
  }

  const requiredFiles = [
    "REQUIREMENTS.md",
    "SPEC.md",
    "ACCEPTANCE.md",
    "TEST-PLAN.md",
    "DECISIONS.md",
    "EVIDENCE.md",
    path.join("scenarios", "acceptance.feature")
  ];
  const specIdPattern = /^\d{4}-\d{2}-\d{2}-[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const statuses = new Set([
    "draft",
    "reviewed",
    "ready-for-implementation",
    "in-progress",
    "verified",
    "archived"
  ]);

  for (const entry of specDirs) {
    const specId = entry.name;
    const specDir = path.join(specsRoot, specId);
    const relativeSpecDir = path.relative(root, specDir).split(path.sep).join("/");

    if (!specIdPattern.test(specId) || specId.includes("--")) {
      errors.push(`Invalid spec package id: ${relativeSpecDir}`);
    }

    for (const requiredFile of requiredFiles) {
      const requiredPath = path.join(specDir, requiredFile);
      if (!(await exists(requiredPath))) {
        errors.push(`${relativeSpecDir} is missing ${requiredFile.split(path.sep).join("/")}.`);
      }
    }

    const specPath = path.join(specDir, "SPEC.md");
    if (await exists(specPath)) {
      const frontmatter = extractSpecFrontmatter(await fs.readFile(specPath, "utf8"));
      if (frontmatter) {
        if (frontmatter.id !== specId) {
          errors.push(`${relativeSpecDir}/SPEC.md frontmatter id must match folder name.`);
        }
        if (!statuses.has(frontmatter.status)) {
          errors.push(`${relativeSpecDir}/SPEC.md has invalid status: ${frontmatter.status ?? "(missing)"}.`);
        }
      } else {
        errors.push(`${relativeSpecDir}/SPEC.md must include YAML frontmatter.`);
      }
    }

    const indexNeedle = `](./${specId}/SPEC.md)`;
    if (indexContent && !indexContent.includes(indexNeedle)) {
      errors.push(`docs/specs/INDEX.md is missing an entry for ${specId}.`);
    }
  }
}

function extractSpecFrontmatter(markdown) {
  const normalized = markdown.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return null;
  }
  const closeIndex = normalized.indexOf("\n---\n", 4);
  if (closeIndex === -1) {
    return null;
  }
  const frontmatter = {};
  for (const line of normalized.slice(4, closeIndex).split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) {
      frontmatter[match[1]] = match[2].replace(/^"|"$/g, "").trim();
    }
  }
  return frontmatter;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function validateSkillReferences(root, skill, errors) {
  const files = await listFilesRecursive(skill.skillDir);
  for (const filePath of files) {
    if (path.extname(filePath).toLowerCase() !== ".md") {
      continue;
    }

    const markdown = await fs.readFile(filePath, "utf8");
    const links = extractMarkdownLinks(markdown);
    for (const link of links) {
      if (shouldSkipLink(link)) {
        continue;
      }

      const target = cleanLinkTarget(link);
      if (!target) {
        continue;
      }
      if (path.isAbsolute(target) || target.split(/[\\/]/).includes("..")) {
        errors.push(
          `${path.relative(root, filePath)} links outside the skill directory: ${link}`
        );
        continue;
      }

      const absoluteTarget = path.resolve(path.dirname(filePath), target);
      if (!absoluteTarget.startsWith(skill.skillDir + path.sep) && absoluteTarget !== skill.skillDir) {
        errors.push(
          `${path.relative(root, filePath)} links outside the skill directory: ${link}`
        );
        continue;
      }
      try {
        await fs.access(absoluteTarget);
      } catch {
        errors.push(
          `${path.relative(root, filePath)} has broken relative reference: ${link}`
        );
      }
    }
  }
}

function extractMarkdownLinks(markdown) {
  const links = [];
  const inlineLinkPattern = /!?\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;
  while ((match = inlineLinkPattern.exec(markdown)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function shouldSkipLink(link) {
  return (
    link.startsWith("#") ||
    /^[a-z][a-z0-9+.-]*:/i.test(link)
  );
}

function cleanLinkTarget(link) {
  const withoutAnchor = link.split("#")[0];
  const withoutQuery = withoutAnchor.split("?")[0];
  try {
    return decodeURIComponent(withoutQuery);
  } catch {
    return withoutQuery;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = await validateCatalog(repoRoot);
  if (result.errors.length > 0) {
    console.error(`Catalog validation failed with ${result.errors.length} error(s):`);
    for (const error of result.errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Catalog validation passed (${result.skillCount} skill(s)).`);
}
