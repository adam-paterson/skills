#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  assertSkillName,
  domainMap,
  loadConfig,
  repoRoot,
  toDisplayName
} from "./lib/catalog.mjs";

const args = parseArgs(process.argv.slice(2));

if (!args.domain || !args.name) {
  usage("Both --domain and --name are required.");
}

assertSkillName(args.name);

const config = await loadConfig(repoRoot);
const domains = domainMap(config);
const domain = domains.get(args.domain);
if (!domain) {
  usage(`Unknown domain "${args.domain}". Valid domains: ${[...domains.keys()].join(", ")}`);
}

const skillDir = path.join(repoRoot, "skills", args.domain, args.name);
try {
  await fs.mkdir(skillDir, { recursive: false });
} catch (error) {
  if (error.code === "EEXIST") {
    throw new Error(`Skill already exists: ${path.relative(repoRoot, skillDir)}`);
  }
  throw error;
}

await fs.mkdir(path.join(skillDir, "agents"), { recursive: true });
await fs.mkdir(path.join(skillDir, "references"), { recursive: true });
await fs.mkdir(path.join(skillDir, "scripts"), { recursive: true });
await fs.mkdir(path.join(skillDir, "assets"), { recursive: true });

const replacements = {
  name: args.name,
  displayName: args.displayName ?? toDisplayName(args.name),
  domain: args.domain,
  domainTitle: domain.title,
  domainDescription: domain.description
};

await writeTemplate(
  path.join(repoRoot, "templates", "skill", "SKILL.md.tmpl"),
  path.join(skillDir, "SKILL.md"),
  replacements
);
await writeTemplate(
  path.join(repoRoot, "templates", "skill", "agents", "openai.yaml.tmpl"),
  path.join(skillDir, "agents", "openai.yaml"),
  replacements
);

console.log(`Created ${path.relative(repoRoot, skillDir)}.`);
console.log("Edit TODOs before running npm run validate.");

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--domain") {
      parsed.domain = argv[++index];
    } else if (token === "--name") {
      parsed.name = argv[++index];
    } else if (token === "--display-name") {
      parsed.displayName = argv[++index];
    } else if (token === "--help" || token === "-h") {
      usage();
    } else {
      usage(`Unknown argument: ${token}`);
    }
  }
  return parsed;
}

async function writeTemplate(templatePath, outputPath, replacements) {
  const template = await fs.readFile(templatePath, "utf8");
  const rendered = template.replace(/{{([A-Za-z0-9_]+)}}/g, (_, key) => {
    if (!(key in replacements)) {
      throw new Error(`Unknown template placeholder: ${key}`);
    }
    return replacements[key];
  });
  await fs.writeFile(outputPath, rendered);
}

function usage(message) {
  if (message) {
    console.error(message);
  }
  console.error("Usage: npm run new-skill -- --domain software --name example-name [--display-name \"Example Name\"]");
  process.exit(message ? 1 : 0);
}
