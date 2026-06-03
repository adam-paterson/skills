#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import {
  listFilesRecursive,
  loadConfig,
  posixJoin,
  repoRoot,
  scanSkills,
  sha256
} from "./lib/catalog.mjs";

const config = await loadConfig(repoRoot);
const skills = await scanSkills(repoRoot);
const publicRoot = path.join(repoRoot, "dist", "public");
const wellKnownRoot = path.join(publicRoot, ".well-known", "agent-skills");

await fs.rm(publicRoot, { recursive: true, force: true });
await fs.mkdir(wellKnownRoot, { recursive: true });
await copyHeaders();

const entries = [];

for (const skill of skills) {
  const artifact = await buildSkillArtifact(skill, wellKnownRoot);
  entries.push({
    name: skill.name,
    type: artifact.type,
    description: skill.description,
    url: artifact.url,
    digest: artifact.digest
  });
}

entries.sort((a, b) => a.name.localeCompare(b.name));

const index = {
  $schema: config.wellKnown.schema,
  skills: entries
};

await fs.writeFile(
  path.join(wellKnownRoot, "index.json"),
  `${JSON.stringify(index, null, 2)}\n`
);

console.log(`Generated ${path.relative(repoRoot, path.join(wellKnownRoot, "index.json"))} with ${entries.length} skill(s).`);

async function copyHeaders() {
  const headersSource = path.join(repoRoot, "public", "_headers");
  try {
    await fs.copyFile(headersSource, path.join(publicRoot, "_headers"));
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

async function buildSkillArtifact(skill, destinationRoot) {
  const files = await listSkillFiles(skill.skillDir);
  const hasSupportingFiles = files.some((file) => file.relativePath !== "SKILL.md");
  const skillOutputDir = path.join(destinationRoot, skill.name);
  await fs.mkdir(skillOutputDir, { recursive: true });

  if (!hasSupportingFiles) {
    const buffer = await fs.readFile(skill.skillFile);
    const outputPath = path.join(skillOutputDir, "SKILL.md");
    await fs.writeFile(outputPath, buffer);
    return {
      type: "skill-md",
      url: posixJoin(config.wellKnown.basePath, skill.name, "SKILL.md"),
      digest: sha256(buffer)
    };
  }

  const archiveBuffer = gzipSync(createTar(files), { level: 9 });
  const outputPath = path.join(skillOutputDir, `${skill.name}.tar.gz`);
  await fs.writeFile(outputPath, archiveBuffer);
  return {
    type: "archive",
    url: posixJoin(config.wellKnown.basePath, skill.name, `${skill.name}.tar.gz`),
    digest: sha256(archiveBuffer)
  };
}

async function listSkillFiles(skillDir) {
  const absoluteFiles = await listFilesRecursive(skillDir, { ignore: new Set() });
  const files = [];

  for (const absolutePath of absoluteFiles) {
    const stat = await fs.lstat(absolutePath);
    const relativePath = path.relative(skillDir, absolutePath).split(path.sep).join("/");
    assertSafeArchivePath(relativePath, stat);
    files.push({
      relativePath,
      mode: stat.mode & 0o777,
      content: await fs.readFile(absolutePath)
    });
  }

  return files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

function assertSafeArchivePath(relativePath, stat) {
  if (stat.isSymbolicLink()) {
    throw new Error(`Refusing to archive symbolic link: ${relativePath}`);
  }
  if (!stat.isFile()) {
    throw new Error(`Refusing to archive non-file path: ${relativePath}`);
  }
  if (
    !relativePath ||
    relativePath.startsWith("/") ||
    relativePath.split("/").includes("..") ||
    relativePath.includes("\\")
  ) {
    throw new Error(`Refusing unsafe archive path: ${relativePath}`);
  }
}

function createTar(files) {
  const chunks = [];
  for (const file of files) {
    const header = createTarHeader(file.relativePath, file.content.length, file.mode || 0o644);
    chunks.push(header, file.content, padding(file.content.length));
  }
  chunks.push(Buffer.alloc(1024));
  return Buffer.concat(chunks);
}

function createTarHeader(name, size, mode) {
  const header = Buffer.alloc(512, 0);
  const { namePart, prefixPart } = splitTarPath(name);

  writeString(header, namePart, 0, 100);
  writeOctal(header, mode, 100, 8);
  writeOctal(header, 0, 108, 8);
  writeOctal(header, 0, 116, 8);
  writeOctal(header, size, 124, 12);
  writeOctal(header, 0, 136, 12);
  header.fill(0x20, 148, 156);
  header[156] = "0".charCodeAt(0);
  writeString(header, "ustar", 257, 6);
  writeString(header, "00", 263, 2);
  writeString(header, "root", 265, 32);
  writeString(header, "root", 297, 32);
  writeString(header, prefixPart, 345, 155);

  let checksum = 0;
  for (const byte of header) {
    checksum += byte;
  }
  writeOctal(header, checksum, 148, 8);
  return header;
}

function splitTarPath(filePath) {
  const encodedLength = Buffer.byteLength(filePath);
  if (encodedLength <= 100) {
    return { namePart: filePath, prefixPart: "" };
  }

  const parts = filePath.split("/");
  for (let index = 1; index < parts.length; index += 1) {
    const prefixPart = parts.slice(0, index).join("/");
    const namePart = parts.slice(index).join("/");
    if (Buffer.byteLength(prefixPart) <= 155 && Buffer.byteLength(namePart) <= 100) {
      return { namePart, prefixPart };
    }
  }

  throw new Error(`Archive path is too long for ustar header: ${filePath}`);
}

function writeString(buffer, value, offset, length) {
  buffer.write(value, offset, Math.min(Buffer.byteLength(value), length), "utf8");
}

function writeOctal(buffer, value, offset, length) {
  const octal = value.toString(8).padStart(length - 1, "0");
  buffer.write(`${octal}\0`, offset, length, "ascii");
}

function padding(size) {
  const remainder = size % 512;
  return remainder === 0 ? Buffer.alloc(0) : Buffer.alloc(512 - remainder);
}
