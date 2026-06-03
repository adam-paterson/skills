#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
const args = new Set(process.argv.slice(2));
const checkOnly = args.has("--check");
const kitRoot = path.join(repoRoot, "kits", "spec-package");
const templateRoot = path.join(kitRoot, "templates");
const workflowSource = path.join(kitRoot, "spec-workflow.md");
const coreSource = path.join(kitRoot, "scripts", "spec-package-core.mjs");

const specPackageConsumers = [
  "skills/software/requirements-intake",
  "skills/software/spec-generation"
];

const workflowReferenceConsumers = [
  "skills/software/acceptance-design",
  "skills/software/delivery-workflow",
  "skills/software/to-gherkin",
  "skills/software/implement-spec",
  "skills/software/release-readiness",
  "skills/software/requirements-capture",
  "skills/software/requirements-intake",
  "skills/software/spec-generation",
  "skills/software/setup-agent-workflow",
  "skills/software/verify-spec"
];

const coreConsumers = [
  "skills/software/requirements-intake",
  "skills/software/spec-generation"
];

const drift = [];

for (const skillPath of specPackageConsumers) {
  await syncDir(templateRoot, path.join(repoRoot, skillPath, "assets", "spec-package"));
}

for (const skillPath of workflowReferenceConsumers) {
  await syncFile(workflowSource, path.join(repoRoot, skillPath, "references", "spec-workflow.md"));
}

for (const skillPath of coreConsumers) {
  await syncFile(coreSource, path.join(repoRoot, skillPath, "scripts", "spec-package-core.mjs"));
}

if (checkOnly && drift.length > 0) {
  console.error(`Skill asset sync check failed with ${drift.length} drift item(s):`);
  for (const item of drift) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log(checkOnly ? "Skill generated assets are in sync." : "Synced generated skill assets.");

async function syncFile(source, target) {
  if (checkOnly) {
    await compareFile(source, target);
    return;
  }

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(source, target);
}

async function syncDir(sourceDir, targetDir) {
  if (checkOnly) {
    await compareDir(sourceDir, targetDir);
    return;
  }

  await fs.rm(targetDir, { recursive: true, force: true });
  await copyDir(sourceDir, targetDir);
}

async function copyDir(sourceDir, targetDir) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const source = path.join(sourceDir, entry.name);
    const target = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      await copyDir(source, target);
    } else if (entry.isFile()) {
      await fs.copyFile(source, target);
    } else {
      throw new Error(`Refusing to sync non-file path: ${path.relative(repoRoot, source)}`);
    }
  }
}

async function compareFile(source, target) {
  const sourceContent = await fs.readFile(source);
  let targetContent;
  try {
    targetContent = await fs.readFile(target);
  } catch (error) {
    if (error.code === "ENOENT") {
      drift.push(`${relative(target)} is missing`);
      return;
    }
    throw error;
  }

  if (!sourceContent.equals(targetContent)) {
    drift.push(`${relative(target)} differs from ${relative(source)}`);
  }
}

async function compareDir(sourceDir, targetDir) {
  const sourceFiles = await listFiles(sourceDir);
  const targetFiles = await listFiles(targetDir);
  const sourceSet = new Set(sourceFiles.map((file) => file.relativePath));
  const targetSet = new Set(targetFiles.map((file) => file.relativePath));

  for (const file of sourceFiles) {
    if (!targetSet.has(file.relativePath)) {
      drift.push(`${relative(path.join(targetDir, file.relativePath))} is missing`);
      continue;
    }
    await compareFile(file.absolutePath, path.join(targetDir, file.relativePath));
  }

  for (const file of targetFiles) {
    if (!sourceSet.has(file.relativePath)) {
      drift.push(`${relative(path.join(targetDir, file.relativePath))} is stale`);
    }
  }
}

async function listFiles(rootDir) {
  const files = [];

  async function walk(currentDir) {
    let entries;
    try {
      entries = await fs.readdir(currentDir, { withFileTypes: true });
    } catch (error) {
      if (error.code === "ENOENT") {
        return;
      }
      throw error;
    }

    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
      } else if (entry.isFile()) {
        files.push({
          absolutePath,
          relativePath: path.relative(rootDir, absolutePath).split(path.sep).join("/")
        });
      } else {
        throw new Error(`Refusing to inspect non-file path: ${relative(absolutePath)}`);
      }
    }
  }

  await walk(rootDir);
  return files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

function relative(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}
