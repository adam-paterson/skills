#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  usage(0);
}

const root = path.resolve(args.root ?? process.cwd());
const specsRoot = path.join(root, "docs", "specs");
const specId = args.spec ?? await findLatestSpecId(specsRoot);

if (!specId) {
  console.log(JSON.stringify({
    setupPresent: await exists(path.join(root, "docs", "agents", "spec-workflow.md")),
    specPresent: false,
    nextStage: "requirements-intake",
    recommendation: "Create a spec package with requirements-intake."
  }, null, 2));
  process.exit(0);
}

const specDir = path.join(specsRoot, specId);
const workflowPath = path.join(specDir, "WORKFLOW.md");
if (!(await exists(workflowPath))) {
  console.log(JSON.stringify({
    setupPresent: await exists(path.join(root, "docs", "agents", "spec-workflow.md")),
    specPresent: true,
    specId,
    workflowPresent: false,
    nextStage: "requirements-intake",
    recommendation: "Migrate this spec package to the enterprise WORKFLOW.md shape."
  }, null, 2));
  process.exit(0);
}

const workflow = await fs.readFile(workflowPath, "utf8");
const frontmatter = extractFrontmatter(workflow);
const stages = extractStages(workflow);
const currentStage = frontmatter.current_stage ?? firstIncompleteStage(stages) ?? "release-readiness";

console.log(JSON.stringify({
  setupPresent: await exists(path.join(root, "docs", "agents", "spec-workflow.md")),
  externalManifestPresent: await exists(path.join(root, "external", "skill-sources.json")),
  specPresent: true,
  specId,
  workflowPresent: true,
  packageLifecycle: frontmatter.package_lifecycle ?? "draft",
  currentStage,
  currentStageStatus: stages.get(currentStage)?.status ?? "unknown",
  nextSkill: skillForStage(currentStage),
  stageStatuses: Object.fromEntries([...stages].map(([stage, value]) => [stage, value.status]))
}, null, 2));

async function findLatestSpecId(specsRoot) {
  let entries;
  try {
    entries = await fs.readdir(specsRoot, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .at(-1) ?? null;
}

function extractFrontmatter(markdown) {
  const normalized = markdown.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return {};
  }
  const closeIndex = normalized.indexOf("\n---\n", 4);
  if (closeIndex === -1) {
    return {};
  }
  const result = {};
  for (const line of normalized.slice(4, closeIndex).split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) {
      result[match[1]] = match[2].replace(/^"|"$/g, "").trim();
    }
  }
  return result;
}

function extractStages(markdown) {
  const stages = new Map();
  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^\|\s*([a-z0-9-]+)\s*\|\s*([a-z-]+)\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|$/);
    if (!match || match[1] === "Stage" || match[1] === "---") {
      continue;
    }
    stages.set(match[1], {
      status: match[2],
      owner: match[3].trim(),
      updated: match[4].trim()
    });
  }
  return stages;
}

function firstIncompleteStage(stages) {
  for (const [stage, value] of stages) {
    if (value.status !== "complete" && value.status !== "skipped") {
      return stage;
    }
  }
  return null;
}

function skillForStage(stage) {
  const mapping = {
    "requirements-intake": "requirements-intake",
    "project-language-review": "external:grill-with-docs",
    "requirements-capture": "requirements-capture",
    "spec-generation": "spec-generation",
    "acceptance-design": "acceptance-design",
    "gherkin-generation": "gherkin-generation",
    "implement-spec": "implement-spec",
    "verify-spec": "verify-spec",
    "release-readiness": "release-readiness"
  };
  return mapping[stage] ?? null;
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--root") {
      parsed.root = requireValue(argv, ++index, token);
    } else if (token === "--spec") {
      parsed.spec = requireValue(argv, ++index, token);
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

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function usage(exitCode, message) {
  if (message) {
    console.error(message);
  }
  console.error("Usage: node scripts/inspect-workflow.mjs --root . [--spec YYYY-MM-DD-short-slug]");
  process.exit(exitCode);
}
