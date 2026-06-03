#!/usr/bin/env node
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { validateCatalog } from "./validate-skills.mjs";

const execFileAsync = promisify(execFile);
const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "skills-fixtures-"));

try {
  await runValidationFixtures();
  await runSpecPackageFixtures();
  await runBuildFixtures();
  console.log("Fixture tests passed.");
} finally {
  await fs.rm(tempRoot, { recursive: true, force: true });
}

async function runValidationFixtures() {
  await assertValidation("valid skill passes", async (root) => {
    await createBaseRepo(root);
    await createSkill(root, "software", "valid-skill", {
      body: "[Reference](references/details.md)",
      files: {
        "references/details.md": "# Details\n"
      }
    });
  }, true);

  await assertValidation("duplicate name fails", async (root) => {
    await createBaseRepo(root);
    await createSkill(root, "software", "first-skill", { name: "duplicate-skill" });
    await createSkill(root, "marketing", "second-skill", { name: "duplicate-skill" });
  }, false, "Duplicate skill name");

  await assertValidation("folder mismatch fails", async (root) => {
    await createBaseRepo(root);
    await createSkill(root, "software", "folder-name", { name: "different-name" });
  }, false, "must match folder");

  await assertValidation("missing description fails", async (root) => {
    await createBaseRepo(root);
    await createSkill(root, "software", "missing-description", { description: "" });
  }, false, "non-empty description");

  await assertValidation("invalid domain fails", async (root) => {
    await createBaseRepo(root);
    await fs.mkdir(path.join(root, "skills", "finance"), { recursive: true });
  }, false, "Unexpected skills domain");

  await assertValidation("broken reference fails", async (root) => {
    await createBaseRepo(root);
    await createSkill(root, "software", "broken-reference", {
      body: "[Missing](references/missing.md)"
    });
  }, false, "broken relative reference");
}

async function runBuildFixtures() {
  const emptyRoot = path.join(tempRoot, "empty-build");
  await createBaseRepo(emptyRoot);
  await execFileAsync("node", [path.join(process.cwd(), "scripts", "build-well-known.mjs")], {
    cwd: emptyRoot,
    env: { ...process.env, SKILLS_REPO_ROOT: emptyRoot }
  });
  const emptyIndexPath = path.join(
    emptyRoot,
    "dist",
    "public",
    ".well-known",
    "agent-skills",
    "index.json"
  );
  const emptyIndex = JSON.parse(await fs.readFile(emptyIndexPath, "utf8"));
  if (!Array.isArray(emptyIndex.skills) || emptyIndex.skills.length !== 0) {
    throw new Error("Empty scaffold build should produce index.json with skills: [].");
  }

  const root = path.join(tempRoot, "artifact-build");
  await createBaseRepo(root);
  await createSkill(root, "software", "artifact-skill", {
    files: {
      "references/details.md": "# Details\n"
    }
  });

  await execScriptWithRoot("scripts/build-well-known.mjs", root);
  const indexPath = path.join(root, "dist", "public", ".well-known", "agent-skills", "index.json");
  const index = JSON.parse(await fs.readFile(indexPath, "utf8"));
  const entry = index.skills.find((skill) => skill.name === "artifact-skill");
  if (!entry || entry.type !== "archive") {
    throw new Error("Expected artifact-skill archive entry.");
  }

  const archivePath = path.join(
    root,
    "dist",
    "public",
    ".well-known",
    "agent-skills",
    "artifact-skill",
    "artifact-skill.tar.gz"
  );
  const archive = await fs.readFile(archivePath);
  const digest = `sha256:${createHash("sha256").update(archive).digest("hex")}`;
  if (entry.digest !== digest) {
    throw new Error("Archive digest does not match generated artifact.");
  }

  const { stdout } = await execFileAsync("tar", ["-tzf", archivePath]);
  if (!stdout.split("\n").includes("SKILL.md")) {
    throw new Error("Archive does not contain SKILL.md at root.");
  }

  await execScriptWithRoot("scripts/build-skills-sh.mjs", root);
  const skillsSh = JSON.parse(await fs.readFile(path.join(root, "skills.sh.json"), "utf8"));
  if (skillsSh.groupings.length !== 1 || skillsSh.groupings[0].skills[0] !== "artifact-skill") {
    throw new Error("skills.sh.json did not group temporary skill by domain.");
  }
}

async function runSpecPackageFixtures() {
  const requirementsRoot = path.join(tempRoot, "requirements-package");
  await createBaseRepo(requirementsRoot);
  await execFileAsync("node", [
    path.join(process.cwd(), "skills", "software", "discuss-requirements", "scripts", "init-requirements-session.mjs"),
    "--root",
    requirementsRoot,
    "--title",
    "Clarify Billing Events",
    "--date",
    "2026-06-02"
  ]);
  let requirementsResult = await validateCatalog(requirementsRoot);
  if (requirementsResult.errors.length > 0) {
    throw new Error(`Generated requirements package should validate: ${requirementsResult.errors.join("; ")}`);
  }
  const requirementsFile = path.join(
    requirementsRoot,
    "docs",
    "specs",
    "2026-06-02-clarify-billing-events",
    "REQUIREMENTS.md"
  );
  const requirementsContent = await fs.readFile(requirementsFile, "utf8");
  if (!requirementsContent.includes("## Requirements Readiness")) {
    throw new Error("Discuss requirements initializer should seed readiness section.");
  }

  const root = path.join(tempRoot, "spec-package");
  await createBaseRepo(root);
  await execFileAsync("node", [
    path.join(process.cwd(), "skills", "software", "spec-generation", "scripts", "init-spec-package.mjs"),
    "--root",
    root,
    "--title",
    "Add Billing Events",
    "--date",
    "2026-06-02"
  ]);

  const specDir = path.join(root, "docs", "specs", "2026-06-02-add-billing-events");
  const requiredFiles = [
    "REQUIREMENTS.md",
    "SPEC.md",
    "ACCEPTANCE.md",
    "TEST-PLAN.md",
    "DECISIONS.md",
    "EVIDENCE.md",
    path.join("scenarios", "acceptance.feature")
  ];
  for (const requiredFile of requiredFiles) {
    await fs.access(path.join(specDir, requiredFile));
  }
  await fs.access(path.join(root, "docs", "agents", "spec-workflow.md"));
  const index = await fs.readFile(path.join(root, "docs", "specs", "INDEX.md"), "utf8");
  if (!index.includes("](./2026-06-02-add-billing-events/SPEC.md)")) {
    throw new Error("Spec package index does not include generated spec.");
  }

  let result = await validateCatalog(root);
  if (result.errors.length > 0) {
    throw new Error(`Generated spec package should validate: ${result.errors.join("; ")}`);
  }

  await fs.rm(path.join(specDir, "EVIDENCE.md"));
  result = await validateCatalog(root);
  if (!result.errors.some((error) => error.includes("is missing EVIDENCE.md"))) {
    throw new Error(`Broken spec package should fail validation: ${result.errors.join("; ")}`);
  }
}

async function assertValidation(name, setup, shouldPass, expectedText) {
  const root = path.join(tempRoot, slug(name));
  await setup(root);
  const result = await validateCatalog(root);
  const passed = result.errors.length === 0;
  if (passed !== shouldPass) {
    throw new Error(`${name}: expected pass=${shouldPass}, got errors: ${result.errors.join("; ")}`);
  }
  if (!shouldPass && expectedText && !result.errors.some((error) => error.includes(expectedText))) {
    throw new Error(`${name}: expected error containing "${expectedText}", got: ${result.errors.join("; ")}`);
  }
}

async function createBaseRepo(root) {
  await fs.mkdir(root, { recursive: true });
  const sourceConfig = JSON.parse(await fs.readFile(path.join(process.cwd(), "catalog.config.json"), "utf8"));
  await fs.writeFile(path.join(root, "catalog.config.json"), `${JSON.stringify(sourceConfig, null, 2)}\n`);
  for (const domain of sourceConfig.domains) {
    await fs.mkdir(path.join(root, "skills", domain.id), { recursive: true });
    await fs.writeFile(path.join(root, "skills", domain.id, "README.md"), `# ${domain.title}\n`);
  }
}

async function createSkill(root, domain, folderName, options = {}) {
  const skillDir = path.join(root, "skills", domain, folderName);
  await fs.mkdir(skillDir, { recursive: true });
  const name = options.name ?? folderName;
  const description = options.description ?? `Use when testing ${name}.`;
  const body = options.body ?? "Follow the fixture workflow.\n";
  await fs.writeFile(
    path.join(skillDir, "SKILL.md"),
    `---\nname: ${name}\ndescription: ${description}\n---\n\n# ${name}\n\n${body}\n`
  );
  for (const [relativePath, content] of Object.entries(options.files ?? {})) {
    const outputPath = path.join(skillDir, relativePath);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, content);
  }
}

async function execScriptWithRoot(script, root) {
  await execFileAsync("node", [path.join(process.cwd(), script)], {
    cwd: root,
    env: { ...process.env, SKILLS_REPO_ROOT: root }
  });
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
