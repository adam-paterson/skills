#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, "..");
const templateRoot = path.join(skillRoot, "assets", "spec-package");
const idPattern = /^\d{4}-\d{2}-\d{2}-[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const statusValues = new Set([
  "draft",
  "reviewed",
  "ready-for-implementation",
  "in-progress",
  "verified",
  "archived"
]);

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  usage(0);
}

if (!args.title && !args.id) {
  usage(1, "Provide --title or --id.");
}

const root = path.resolve(args.root ?? process.cwd());
const today = args.date ?? new Date().toISOString().slice(0, 10);
const title = args.title ?? titleFromId(args.id);
const status = args.status ?? "draft";

if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
  usage(1, `Invalid --date value: ${today}`);
}

if (!statusValues.has(status)) {
  usage(1, `Invalid --status value: ${status}`);
}

const specId = args.id ?? `${today}-${slugify(title)}`;
if (!idPattern.test(specId) || specId.includes("--")) {
  usage(1, `Invalid spec id: ${specId}`);
}

const specsRoot = path.join(root, "docs", "specs");
const specDir = path.join(specsRoot, specId);

if (await exists(specDir)) {
  if (!args.force) {
    throw new Error(`Spec package already exists: ${relative(root, specDir)}. Pass --force to overwrite template files.`);
  }
} else {
  await fs.mkdir(specDir, { recursive: true });
}

const replacements = {
  SPEC_ID: specId,
  TITLE: title,
  STATUS: status,
  CREATED: today,
  UPDATED: today
};

await copyTemplates(templateRoot, specDir, replacements, args.force);
await ensureSpecWorkflowDoc(root);
await updateIndex(specsRoot, specId, title, status, today);

console.log(`Spec package ready: ${relative(root, specDir)}`);

async function copyTemplates(sourceDir, targetDir, replacements, force) {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const source = path.join(sourceDir, entry.name);
    const target = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      await fs.mkdir(target, { recursive: true });
      await copyTemplates(source, target, replacements, force);
      continue;
    }
    if (!entry.isFile()) {
      throw new Error(`Refusing to copy non-file template: ${source}`);
    }
    if (!force && await exists(target)) {
      continue;
    }
    const rendered = render(await fs.readFile(source, "utf8"), replacements);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, rendered);
  }
}

async function updateIndex(specsRoot, specId, title, status, updated) {
  await fs.mkdir(specsRoot, { recursive: true });
  const indexPath = path.join(specsRoot, "INDEX.md");
  const row = `| [${title}](./${specId}/SPEC.md) | ${status} | ${updated} |`;
  let content = "# Specs\n\n| Spec | Status | Updated |\n| --- | --- | --- |\n";

  if (await exists(indexPath)) {
    content = await fs.readFile(indexPath, "utf8");
    if (!content.includes("| Spec | Status | Updated |")) {
      content = `${content.trimEnd()}\n\n| Spec | Status | Updated |\n| --- | --- | --- |\n`;
    }
  }

  const lines = content.trimEnd().split("\n");
  const linkFragment = `](./${specId}/SPEC.md)`;
  const existingIndex = lines.findIndex((line) => line.includes(linkFragment));
  if (existingIndex >= 0) {
    lines[existingIndex] = row;
  } else {
    lines.push(row);
  }

  await fs.writeFile(indexPath, `${lines.join("\n")}\n`);
}

async function ensureSpecWorkflowDoc(root) {
  const agentsDir = path.join(root, "docs", "agents");
  const target = path.join(agentsDir, "spec-workflow.md");
  if (await exists(target)) {
    return;
  }

  await fs.mkdir(agentsDir, { recursive: true });
  const source = path.join(skillRoot, "references", "spec-workflow.md");
  const content = await fs.readFile(source, "utf8");
  await fs.writeFile(target, content);
}

function render(template, replacements) {
  return template.replace(/{{([A-Z_]+)}}/g, (_, key) => {
    if (!(key in replacements)) {
      throw new Error(`Unknown template placeholder: ${key}`);
    }
    return replacements[key];
  });
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--root") {
      parsed.root = requireValue(argv, ++index, token);
    } else if (token === "--title") {
      parsed.title = requireValue(argv, ++index, token);
    } else if (token === "--id") {
      parsed.id = requireValue(argv, ++index, token);
    } else if (token === "--status") {
      parsed.status = requireValue(argv, ++index, token);
    } else if (token === "--date") {
      parsed.date = requireValue(argv, ++index, token);
    } else if (token === "--force") {
      parsed.force = true;
    } else if (token === "--help" || token === "-h") {
      parsed.help = true;
    } else {
      usage(1, `Unknown argument: ${token}`);
    }
  }
  return parsed;
}

function requireValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    usage(1, `${flag} requires a value.`);
  }
  return value;
}

function slugify(value) {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  if (!slug) {
    throw new Error("Title must contain at least one ASCII letter or digit after slugification.");
  }
  return slug.slice(0, 72).replace(/-+$/g, "");
}

function titleFromId(id) {
  return id
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function relative(root, target) {
  return path.relative(root, target).split(path.sep).join("/");
}

function usage(exitCode, message) {
  if (message) {
    console.error(message);
  }
  console.error(`Usage: node scripts/init-spec-package.mjs --root . --title "Add agent skill catalog" [--id YYYY-MM-DD-short-slug] [--status draft] [--date YYYY-MM-DD] [--force]`);
  process.exit(exitCode);
}
