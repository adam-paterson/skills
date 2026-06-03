#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { loadConfig, repoRoot, scanSkills } from "./lib/catalog.mjs";

const config = await loadConfig(repoRoot);
const skills = await scanSkills(repoRoot);
const outputPath = path.join(repoRoot, "skills.sh.json");

if (skills.length === 0) {
  await fs.rm(outputPath, { force: true });
  console.log("No skills found; skills.sh.json not generated.");
  process.exit(0);
}

const groupings = config.domains
  .map((domain) => ({
    title: domain.title,
    description: domain.description,
    skills: skills
      .filter((skill) => skill.domain === domain.id)
      .map((skill) => skill.name)
      .sort()
  }))
  .filter((grouping) => grouping.skills.length > 0);

const payload = {
  $schema: config.skillsSh.schema,
  notGrouped: config.skillsSh.notGrouped,
  groupings
};

await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Generated ${path.relative(repoRoot, outputPath)} with ${skills.length} skill(s).`);
