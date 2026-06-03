#!/usr/bin/env node
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = path.resolve(
  process.env.SKILLS_REPO_ROOT ??
    path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..")
);

export const skillNamePattern = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;
export const ignoredDirs = new Set([
  ".git",
  ".wrangler",
  "dist",
  "node_modules"
]);

export function assertSkillName(name, label = "skill name") {
  if (!skillNamePattern.test(name) || name.includes("--")) {
    throw new Error(
      `${label} must be lowercase kebab-case, 1-64 characters, with no consecutive hyphens: ${name}`
    );
  }
}

export function toDisplayName(name) {
  return name
    .split("-")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export function normalizeDescription(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

export async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function loadConfig(root = repoRoot) {
  const configPath = path.join(root, "catalog.config.json");
  const config = JSON.parse(await fs.readFile(configPath, "utf8"));
  if (!Array.isArray(config.domains) || config.domains.length === 0) {
    throw new Error("catalog.config.json must define at least one domain.");
  }
  return config;
}

export function domainMap(config) {
  return new Map(config.domains.map((domain) => [domain.id, domain]));
}

export async function listDirSafe(dirPath) {
  try {
    return await fs.readdir(dirPath, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function listFilesRecursive(rootDir, options = {}) {
  const files = [];
  const rootName = path.basename(rootDir);
  const ignore = options.ignore ?? ignoredDirs;

  async function walk(currentDir) {
    const entries = await listDirSafe(currentDir);
    for (const entry of entries) {
      if (ignore.has(entry.name)) {
        continue;
      }

      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
      } else if (entry.isFile()) {
        files.push(absolutePath);
      } else if (entry.isSymbolicLink()) {
        files.push(absolutePath);
      }
    }
  }

  if (!ignore.has(rootName)) {
    await walk(rootDir);
  }

  return files.sort((a, b) => a.localeCompare(b));
}

export function parseSkillMarkdown(markdown, filePath = "SKILL.md") {
  const normalized = markdown.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    throw new Error(`${filePath} must start with YAML frontmatter.`);
  }

  const closeIndex = normalized.indexOf("\n---\n", 4);
  if (closeIndex === -1) {
    throw new Error(`${filePath} must include a closing frontmatter marker.`);
  }

  const frontmatterText = normalized.slice(4, closeIndex);
  const body = normalized.slice(closeIndex + "\n---\n".length);
  return {
    frontmatter: parseSimpleYaml(frontmatterText, filePath),
    body
  };
}

function parseSimpleYaml(text, filePath) {
  const lines = text.split("\n");
  const result = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim() || line.trimStart().startsWith("#")) {
      continue;
    }
    if (/^\s/.test(line)) {
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!match) {
      throw new Error(`${filePath} has unsupported frontmatter line: ${line}`);
    }

    const [, key, rawValue = ""] = match;
    if (rawValue === "|" || rawValue === ">") {
      const blockLines = [];
      while (index + 1 < lines.length && /^\s+/.test(lines[index + 1])) {
        index += 1;
        blockLines.push(lines[index].replace(/^\s{2,}/, ""));
      }
      result[key] = rawValue === ">" ? blockLines.join(" ") : blockLines.join("\n");
      continue;
    }

    result[key] = unquoteYamlString(rawValue.trim());
  }

  return result;
}

function unquoteYamlString(value) {
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

export async function scanSkills(root = repoRoot) {
  const config = await loadConfig(root);
  const domains = domainMap(config);
  const skillsRoot = path.join(root, "skills");
  const discovered = [];

  for (const domain of config.domains) {
    const domainDir = path.join(skillsRoot, domain.id);
    const entries = await listDirSafe(domainDir);
    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const skillDir = path.join(domainDir, entry.name);
      const skillFile = path.join(skillDir, "SKILL.md");
      if (!(await pathExists(skillFile))) {
        continue;
      }

      const markdown = await fs.readFile(skillFile, "utf8");
      const parsed = parseSkillMarkdown(markdown, path.relative(root, skillFile));
      discovered.push({
        domain: domain.id,
        domainTitle: domains.get(domain.id)?.title ?? domain.id,
        folderName: entry.name,
        skillDir,
        skillFile,
        relativeSkillDir: path.relative(root, skillDir).split(path.sep).join("/"),
        relativeSkillFile: path.relative(root, skillFile).split(path.sep).join("/"),
        frontmatter: parsed.frontmatter,
        body: parsed.body,
        name: parsed.frontmatter.name,
        description: normalizeDescription(parsed.frontmatter.description)
      });
    }
  }

  return discovered.sort((a, b) => a.name.localeCompare(b.name));
}

export async function findAllSkillMarkdownFiles(root = repoRoot) {
  const files = await listFilesRecursive(root);
  return files
    .filter((filePath) => path.basename(filePath) === "SKILL.md")
    .map((filePath) => path.relative(root, filePath).split(path.sep).join("/"));
}

export function isExpectedSkillPath(relativePath, config) {
  const parts = relativePath.split("/");
  if (parts.length !== 4 || parts[0] !== "skills" || parts[3] !== "SKILL.md") {
    return false;
  }
  return domainMap(config).has(parts[1]) && skillNamePattern.test(parts[2]);
}

export function sha256(buffer) {
  return `sha256:${createHash("sha256").update(buffer).digest("hex")}`;
}

export function posixJoin(...parts) {
  return parts.filter(Boolean).join("/").replace(/\/+/g, "/");
}
