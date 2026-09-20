# Cucumber and Gherkin guidance

## Gherkin syntax and quality gates

Use these checks when drafting or reviewing scenarios.

- Use two-space indentation and one `Feature` per `.feature` file. Name the business capability and describe its purpose where needed.
- Use the stakeholders' domain language. For a non-English Gherkin dialect, add `# language: <code>` on the first line.
- Add colons to `Feature`, `Rule`, `Background`, `Scenario`, `Scenario Outline`, and `Examples`, but not step keywords. Comments start with `#`; Gherkin has no block comments.
- Use `Rule` to group examples of one business rule when a feature covers several rules. `Scenario` and `Example` are synonyms.
- Make each scenario a concrete example of one rule or outcome. Aim for 3-5 steps. Split scenarios with independent outcomes even when they share setup.
- Use `Given` for preconditions, `When` for the event, and `Then` for a result observable by a user or external system.
- Describe domain behavior. Keep clicks, selectors, mocks, class names, and database assertions in automation code unless the technical detail is itself the actor's contract. Ask whether a different implementation would require rewriting the scenario.
- Use consistent wording for each domain concept. Cucumber ignores step keywords when matching definitions, so distinguish context from outcomes in the step text.
- Use `And` or `But` for additional steps. Split a step that joins separate actions or assertions; retain conjunctions that belong to a single domain concept. Use `*` for list-like steps when it improves readability.
- Use one short `Background` per `Feature` or `Rule` for shared business context. It runs before each scenario, after before-hooks. If it exceeds about four lines, simplify the context or split the feature or rule. Put technical setup in hooks or fixtures.
- Use `Scenario Outline` when one scenario shape covers multiple input/output rows. Include at least one `Examples` section and match every `<placeholder>` to a table header.
- Use Doc Strings for larger text arguments and Data Tables for structured inputs. Escape table-cell newlines, pipes, and backslashes with `\n`, `\|`, and `\\`.
- Add tags for filtering, ownership, risk, environments, reporting, or automation routing. Fix unclear scenarios rather than compensating with tags.

```gherkin
Feature: Cash withdrawal

  Rule: Withdrawals cannot exceed the available balance

    Scenario: Reject a withdrawal above the available balance
      Given my account has an available balance of £50
      When I request a withdrawal of £60
      Then the withdrawal should be declined
      And my available balance should remain £50
```

## BDD suite check

Inspect the target component's manifests, lockfiles, test configuration, existing `.feature` files, and step definitions. In a multi-language repository, assess the component under test rather than assuming one language for the whole repo.

Search feature locations such as `features/`, `tests/`, and `src/test/resources/`. Inspect the applicable language signals below.

| Platform | Evidence to inspect | Candidate tool |
| --- | --- | --- |
| JVM | `pom.xml`, Gradle files, `build.sbt`, test source sets, `io.cucumber` dependencies | Cucumber-JVM; Cucumber-Scala where appropriate |
| JavaScript or TypeScript | `package.json`, lockfile, Cucumber config, `@cucumber/cucumber` or `cucumber-js` scripts | Cucumber-JS |
| Ruby or Rails | `Gemfile`, `Rakefile`, `features/support/env.rb`, `cucumber` or `cucumber-rails` | Cucumber-Ruby; add `cucumber-rails` for Rails |
| Python | `pyproject.toml`, `setup.cfg`, `requirements*.txt`, `pytest.ini`, `behave.ini`, `features/steps` | Prefer `pytest-bdd` with an existing pytest suite; otherwise Behave |
| .NET | `*.csproj`, `*.sln`, `Directory.Packages.props`, Reqnroll, SpecFlow, or Xunit.Gherkin.Quick packages | Reqnroll or Xunit.Gherkin.Quick |
| PHP | `composer.json`, `behat.yml`, `features/bootstrap` | Behat |
| Go | `go.mod`, Godog imports, existing test runners | Godog |
| Rust | `Cargo.toml`, cucumber crate usage, `tests/` | Cucumber-Rust |
| C or C++ | CMake or other build files, Cucumber.cpp or amp-cucumber-cpp-runner references | Confirm project-specific build integration before offering either tool |
| Android or iOS | Android Gradle or Xcode projects, existing mobile test infrastructure | Consider Cucumber-Android or Cucumberish when mobile acceptance tests are wanted |

Treat these tools as candidates, not proof of current support. Check maintenance and compatibility with the project's runtime and test runner before recommending initialization, especially for legacy or unlisted platforms. If support is unclear, report the uncertainty rather than choosing a tool by language alone.

For an existing suite, reuse feature locations, tags, step vocabulary, and step definitions. Ensure the runner can discover any new feature files; avoid duplicate copies.

If no suite exists and a compatible tool is clear, propose:

1. The detected platform and evidence files.
2. The tool and why it fits the existing test runner.
3. Dependencies and files to add, following the repo's package manager and version policy.
4. A smoke scenario at the domain, API, component, or browser level, with the reason for that choice.
5. The local run command and any CI or reporting follow-up.

Ask for confirmation before installing dependencies or creating suite scaffolding.

## Automation design

Read this section when recommending an automation level or initializing an approved suite.

- Organize step definitions by domain concept rather than feature file. Reuse existing definitions and add only those required by scenarios.
- Consolidate similar definitions with parameters or Cucumber Expressions. Share host-language helpers rather than calling steps from other steps.
- Keep scenarios independent and step state scenario-scoped. Use `World` in JavaScript or Ruby, or scenario-scoped instances in JVM projects. Reset databases and shared browser state between scenarios.
- Use hooks for technical setup and teardown. Keep business-relevant setup visible in `Background` or `Given` steps.
- Exercise real application behavior where practical. Use stubs or fakes for external systems when needed.
- Choose domain, API, or component tests when they prove the behavior. Reserve browser and full-stack tests for outcomes that need them.
- Use the build tool's test integration in CI. Preserve Cucumber's non-zero exit status on failure and use machine-readable reports such as JUnit XML where supported.

## Sources

Consult the relevant official documentation when syntax, integration, or tool support needs verification.

- [Gherkin reference](https://cucumber.io/docs/gherkin/reference)
- [Better Gherkin](https://cucumber.io/docs/bdd/better-gherkin)
- [Example mapping](https://cucumber.io/docs/bdd/example-mapping)
- [Step organization](https://cucumber.io/docs/gherkin/step-organization)
- [Scenario state](https://cucumber.io/docs/cucumber/state)
- [Anti-patterns](https://cucumber.io/docs/guides/anti-patterns)
- [Testable architecture](https://cucumber.io/docs/guides/testable-architecture)
- [Tool implementations](https://cucumber.io/docs/tools)
- [Installation guides](https://cucumber.io/docs/installation)
