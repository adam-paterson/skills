#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runSpecPackageInitializer } from "./spec-package-core.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, "..");

await runSpecPackageInitializer({
  skillRoot,
  commandName: "scripts/init-spec-package.mjs",
  defaultLifecycle: "draft",
  defaultCurrentStage: "requirements-intake",
  outputLabel: "Spec package",
  titleExample: "Add agent skill catalog"
});
