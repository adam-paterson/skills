# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Agent Skills catalog publishing the same skills through GitHub source folders, skills.sh discovery, and a Cloudflare Pages `/.well-known/agent-skills/` index.
- Software workflow skills that compose into an enterprise spec-package flow: `delivery-workflow`, `requirements-intake`, `requirements-capture`, `spec-generation`, `acceptance-design`, `gherkin-generation`, `implement-spec`, `verify-spec`, `release-readiness`, `property-testing`, and `mutation-testing`.
- `setup-agent-workflow` skill to prepare a repository with a shared spec-package convention for the software workflow skills.
- `changelog` skill to create and maintain a `CHANGELOG.md` following Keep a Changelog 1.1.0.
- Catalog tooling to scaffold draft skills, validate the catalog, and build the skills.sh and well-known discovery artifacts.
