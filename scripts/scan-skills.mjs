#!/usr/bin/env node
import { scanSkills, repoRoot } from "./lib/catalog.mjs";

const skills = await scanSkills(repoRoot);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ skills }, null, 2));
} else if (skills.length === 0) {
  console.log("No skills discovered.");
} else {
  for (const skill of skills) {
    console.log(`${skill.name}\t${skill.domain}\t${skill.relativeSkillDir}`);
  }
}
