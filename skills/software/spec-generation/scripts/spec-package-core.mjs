import { promises as fs } from "node:fs";
import path from "node:path";

const idPattern = /^\d{4}-\d{2}-\d{2}-[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const packageLifecycleValues = new Set([
  "draft",
  "ready-for-implementation",
  "in-progress",
  "implemented",
  "verified",
  "release-ready",
  "archived"
]);

export async function runSpecPackageInitializer(options) {
  const {
    argv = process.argv.slice(2),
    skillRoot,
    commandName,
    defaultLifecycle = "draft",
    defaultCurrentStage = "requirements-intake",
    outputLabel = "Spec package",
    titleExample = "Add agent skill catalog"
  } = options;

  if (!skillRoot) {
    throw new Error("runSpecPackageInitializer requires skillRoot.");
  }

  const args = parseArgs(argv, commandName, titleExample);
  if (args.help) {
    usage(0, { commandName, titleExample });
  }
  if (!args.title && !args.id) {
    usage(1, { commandName, titleExample, message: "Provide --title or --id." });
  }

  const root = path.resolve(args.root ?? process.cwd());
  const today = args.date ?? new Date().toISOString().slice(0, 10);
  const title = args.title ?? titleFromId(args.id);
  const packageLifecycle = args.lifecycle ?? args.status ?? defaultLifecycle;
  const currentStage = args.currentStage ?? defaultCurrentStage;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
    usage(1, { commandName, titleExample, message: `Invalid --date value: ${today}` });
  }
  if (!packageLifecycleValues.has(packageLifecycle)) {
    usage(1, { commandName, titleExample, message: `Invalid --lifecycle value: ${packageLifecycle}` });
  }

  const specId = args.id ?? `${today}-${slugify(title)}`;
  if (!idPattern.test(specId) || specId.includes("--")) {
    usage(1, { commandName, titleExample, message: `Invalid spec id: ${specId}` });
  }

  const specsRoot = path.join(root, "docs", "specs");
  const specDir = path.join(specsRoot, specId);

  if (await exists(specDir)) {
    if (!args.force) {
      throw new Error(`${outputLabel} already exists: ${relative(root, specDir)}. Pass --force to overwrite template files.`);
    }
  } else {
    await fs.mkdir(specDir, { recursive: true });
  }

  const replacements = {
    SPEC_ID: specId,
    TITLE: title,
    PACKAGE_LIFECYCLE: packageLifecycle,
    CURRENT_STAGE: currentStage,
    CREATED: today,
    UPDATED: today
  };

  await copyTemplates(path.join(skillRoot, "assets", "spec-package"), specDir, replacements, args.force);
  await ensureSpecWorkflowDoc(root, path.join(skillRoot, "references", "spec-workflow.md"));
  await updateIndex(specsRoot, specId, title, packageLifecycle, today);

  console.log(`${outputLabel} ready: ${relative(root, specDir)}`);
}

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

async function ensureSpecWorkflowDoc(root, source) {
  const agentsDir = path.join(root, "docs", "agents");
  const target = path.join(agentsDir, "spec-workflow.md");
  if (await exists(target)) {
    return;
  }

  await fs.mkdir(agentsDir, { recursive: true });
  await fs.copyFile(source, target);
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

function render(template, replacements) {
  return template.replace(/{{([A-Z_]+)}}/g, (_, key) => {
    if (!(key in replacements)) {
      throw new Error(`Unknown template placeholder: ${key}`);
    }
    return replacements[key];
  });
}

function parseArgs(argv, commandName, titleExample) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--root") {
      parsed.root = requireValue(argv, ++index, token, commandName, titleExample);
    } else if (token === "--title") {
      parsed.title = requireValue(argv, ++index, token, commandName, titleExample);
    } else if (token === "--id") {
      parsed.id = requireValue(argv, ++index, token, commandName, titleExample);
    } else if (token === "--lifecycle" || token === "--status") {
      parsed.lifecycle = requireValue(argv, ++index, token, commandName, titleExample);
    } else if (token === "--current-stage") {
      parsed.currentStage = requireValue(argv, ++index, token, commandName, titleExample);
    } else if (token === "--date") {
      parsed.date = requireValue(argv, ++index, token, commandName, titleExample);
    } else if (token === "--force") {
      parsed.force = true;
    } else if (token === "--help" || token === "-h") {
      parsed.help = true;
    } else {
      usage(1, { commandName, titleExample, message: `Unknown argument: ${token}` });
    }
  }
  return parsed;
}

function requireValue(argv, index, flag, commandName, titleExample) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    usage(1, { commandName, titleExample, message: `${flag} requires a value.` });
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

function usage(exitCode, options) {
  if (options.message) {
    console.error(options.message);
  }
  console.error(`Usage: node ${options.commandName} --root . --title "${options.titleExample}" [--id YYYY-MM-DD-short-slug] [--lifecycle draft] [--current-stage requirements-intake] [--date YYYY-MM-DD] [--force]`);
  process.exit(exitCode);
}
