#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, "..");
const managedStart = "<!-- agent-skills-directory:start -->";
const managedEnd = "<!-- agent-skills-directory:end -->";

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  usage(0);
}

const root = path.resolve(args.root ?? process.cwd());
const agentFile = args.noAgentFile ? null : await resolveAgentFile(root, args.agentFile);

await ensureSpecWorkflowDoc(root, args.force);
await ensureSpecIndex(root);

if (agentFile) {
  await updateAgentFile(root, agentFile);
}

console.log(`Agent workflow ready: ${relative(root, path.join(root, "docs", "agents", "spec-workflow.md"))}`);

async function resolveAgentFile(root, requestedFile) {
  if (requestedFile) {
    assertRelativeMarkdownFile(requestedFile, "--agent-file");
    return requestedFile;
  }

  if (await exists(path.join(root, "CLAUDE.md"))) {
    return "CLAUDE.md";
  }
  if (await exists(path.join(root, "AGENTS.md"))) {
    return "AGENTS.md";
  }
  return "AGENTS.md";
}

async function ensureSpecWorkflowDoc(root, force) {
  const agentsDir = path.join(root, "docs", "agents");
  const target = path.join(agentsDir, "spec-workflow.md");
  if (!force && await exists(target)) {
    return;
  }

  await fs.mkdir(agentsDir, { recursive: true });
  await fs.copyFile(path.join(skillRoot, "references", "spec-workflow.md"), target);
}

async function ensureSpecIndex(root) {
  const specsRoot = path.join(root, "docs", "specs");
  const indexPath = path.join(specsRoot, "INDEX.md");
  if (await exists(indexPath)) {
    return;
  }

  await fs.mkdir(specsRoot, { recursive: true });
  await fs.writeFile(
    indexPath,
    "# Specs\n\n| Spec | Status | Updated |\n| --- | --- | --- |\n"
  );
}

async function updateAgentFile(root, agentFile) {
  const target = path.join(root, agentFile);
  const block = renderAgentBlock();
  let content = "";
  if (await exists(target)) {
    content = await fs.readFile(target, "utf8");
  }

  const updated = replaceManagedBlock(content, block);
  await fs.writeFile(target, updated);
}

function replaceManagedBlock(content, block) {
  const trimmedBlock = block.trimEnd();
  if (!content.trim()) {
    return `${trimmedBlock}\n`;
  }

  const startIndex = content.indexOf(managedStart);
  const endIndex = content.indexOf(managedEnd);
  if (startIndex >= 0 && endIndex > startIndex) {
    const before = content.slice(0, startIndex).trimEnd();
    const after = content.slice(endIndex + managedEnd.length).trimStart();
    return `${before ? `${before}\n\n` : ""}${trimmedBlock}${after ? `\n\n${after}` : "\n"}`;
  }

  return `${content.trimEnd()}\n\n${trimmedBlock}\n`;
}

function renderAgentBlock() {
  return `${managedStart}
## Agent Skills

### Spec Workflow

Software requirements and specs live under \`docs/specs/\` and follow \`docs/agents/spec-workflow.md\`.

Use \`delivery-workflow\` to route the enterprise workflow: \`requirements-intake\`, external \`grill-with-docs\`, \`requirements-capture\`, \`spec-generation\`, \`acceptance-design\`, \`to-gherkin\`, \`implement-spec\`, \`verify-spec\`, \`release-readiness\`, and \`changelog\` as needed.
${managedEnd}
`;
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--root") {
      parsed.root = requireValue(argv, ++index, token);
    } else if (token === "--agent-file") {
      parsed.agentFile = requireValue(argv, ++index, token);
    } else if (token === "--force") {
      parsed.force = true;
    } else if (token === "--no-agent-file") {
      parsed.noAgentFile = true;
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

function assertRelativeMarkdownFile(filePath, flag) {
  if (
    path.isAbsolute(filePath) ||
    filePath.split(/[\\/]/).includes("..") ||
    path.basename(filePath) !== filePath ||
    path.extname(filePath).toLowerCase() !== ".md"
  ) {
    usage(1, `${flag} must be a root-level markdown filename such as AGENTS.md or CLAUDE.md.`);
  }
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
  console.error("Usage: node scripts/setup-agent-workflow.mjs --root . [--agent-file AGENTS.md] [--force] [--no-agent-file]");
  process.exit(exitCode);
}
