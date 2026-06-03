# Cucumber/Gherkin Guidance

This reference distills the Cucumber documentation for writing and automating Gherkin. Use it as a checklist; do not copy large doc passages into user output.

## BDD framing

- BDD is a collaboration process, not just Cucumber usage. It closes the gap between business and technical people with shared examples, rapid iteration, and automatically checked living documentation.
- Follow the practice order: discovery, formulation, then automation. If discovery/examples are weak, pause and ask for conversation or example mapping.
- Gherkin should be written collaboratively at first; later it can be drafted by an automation owner plus quality owner, with active business review.
- The Three Amigos perspectives matter: product owns scope, tester explores edge cases and failure behavior, developer exposes constraints and automation concerns.
- Examples should be concrete, real-world, and domain-specific. Avoid technology assumptions; use the “imagine it is 1922” test where possible.

## Gherkin syntax and semantics

- Use two-space indentation. Comments start with `#` at line start; block comments are not supported.
- Keywords with colons need them (`Feature:`, `Rule:`, `Background:`, `Scenario:`, `Scenario Outline:`, `Examples:`). Do not add colons to step keywords.
- One `.feature` file contains one `Feature`. The feature name and optional Markdown description document purpose, business rules, and context.
- `Rule` is optional and groups scenarios/examples for one business rule. Prefer `Rule` when a feature contains several independent business rules.
- `Scenario` and `Example` are synonyms. Each scenario is a concrete example of a rule and follows context (`Given`), event (`When`), outcome (`Then`). Cucumber recommends 3-5 steps where practical.
- Cucumber ignores the step keyword when matching step definitions; duplicate text under different step keywords is ambiguous. Make wording reveal context vs outcome, e.g. `Given my account has a balance...` versus `Then my account should have a balance...`.
- `Given` sets preconditions/known state. Avoid user interaction in `Given`.
- `When` states the event/action. Prefer domain events over UI gestures.
- `Then` states observable output for a user or external system. Resist database/internal assertions unless those are the contract.
- `And`/`But` improve readability for additional steps. If a step contains “and” as part of its text, split it unless a single domain concept genuinely uses that phrase.
- `*` may replace step keywords for list-like steps.
- `Background` runs before each scenario in a `Feature` or `Rule`, after before-hooks. Use only one per scope. Keep it short, vivid, and client-relevant; if it is more than about four lines or scrolls away, split the feature/rule or raise abstraction.
- Use `Scenario Outline` only for the same scenario shape with multiple value rows. It must have one or more `Examples` sections; placeholders use `<name>` and match table headers.
- Use `Doc Strings` for larger text arguments and `Data Tables` for list/table inputs. Escape table cells with `\n`, `\|`, and `\\` as needed.
- If the domain language is not English, use the spoken language your users/domain experts use and add `# language: <code>` on the first line when needed.

## Writing better Gherkin

- Describe behavior, not implementation. Ask: “Will this wording need to change if the implementation changes?” If yes, rework it.
- Prefer declarative steps that express capability/value over imperative sequences of clicks, fields, URLs, selectors, endpoints, mocks, or class names.
- Keep scenarios brief and focused; if the scenario name cannot be a single non-run-on sentence, split it.
- Use consistent wording for the same domain concept across scenarios.
- Put procedural details in step definitions, helper methods, fixtures, or lower-level tests.
- Do not combine independent outcomes in one scenario just because they share setup.
- Use tags for filtering, ownership, risk, environments, reporting, or automation routing. Do not use tags to hide unclear scenario design.

## Automation and anti-patterns

- Organize step definitions by domain concept, not by feature file or scenario. A good rule of thumb is one step-definition file per major domain object/capability.
- Avoid feature-coupled step definitions; they cause duplication and high maintenance cost.
- Do not write step definitions that are not used by scenarios.
- Avoid similar/duplicated step definitions. Use parameters, Cucumber Expressions/regex, and helper methods to consolidate behavior.
- Keep steps atomic. Do not call steps from step definitions for reuse; extract helper methods in the host language.
- Scenarios must be independent. Do not share state between scenarios; avoid globals/statics, clean databases in hooks, clear browser cookies if browsers are shared.
- Keep state shared between steps scenario-scoped (`World` in JS/Ruby, new glue instances or scenario-scoped DI in JVM).
- Hooks are invisible to feature readers. Prefer `Background` when setup is business-relevant; use hooks for low-level setup/teardown such as browser startup or data cleanup.
- Mocking is usually discouraged in Cucumber. Prefer exercising realistic stack boundaries; use stubs/fakes for external systems where needed.
- Design for fast feedback and testable architecture. Do not rely solely on UI tests; prefer domain/API/component-level checks where they prove the behavior, and keep only a few full-stack/UI checks.
- In CI, Cucumber exits non-zero when scenarios fail. Prefer build-tool integration and machine-readable reports such as JUnit XML where supported.

## Required project BDD suite check

When using this skill in a repository, always inspect whether the project already has a BDD/Gherkin suite and whether the primary language has a well-known supported tool.

### Detection checklist

Inspect, at minimum:

- Existing Gherkin: `features/**/*.feature`, `*.feature`, `src/test/resources/**/*.feature`, `tests/**/*.feature`.
- Java/Kotlin/Scala/JVM: `pom.xml`, `build.gradle`, `build.gradle.kts`, `settings.gradle`, `build.sbt`, `src/test/java`, `src/test/kotlin`, dependencies containing `io.cucumber`.
- JavaScript/TypeScript: `package.json`, lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`), dependencies/scripts containing `@cucumber/cucumber`, `cucumber-js`, `cucumber.mjs`, `features/step_definitions`.
- Ruby/Rails: `Gemfile`, `Rakefile`, `features/support/env.rb`, `features/step_definitions`, gems `cucumber`, `cucumber-rails`.
- Python: `pyproject.toml`, `setup.cfg`, `requirements*.txt`, `pytest.ini`, existing `behave.ini`, `features/steps`, dependencies `behave` or `pytest-bdd`.
- .NET: `*.csproj`, `*.sln`, `Directory.Packages.props`, packages for Reqnroll/SpecFlow/Xunit.Gherkin.Quick.
- PHP: `composer.json`, `behat.yml`, `features/bootstrap`, dependency `behat/behat`.
- Go: `go.mod`, dependency or imports for `github.com/cucumber/godog`, `features/`.
- Rust: `Cargo.toml`, cucumber crate usage, `tests/` and `features/`.
- C/C++: CMake/build files plus Cucumber.cpp or amp-cucumber-cpp-runner references.
- Mobile: Android Gradle projects or iOS/Xcode projects using Cucumber-Android or Cucumberish.

### Tool mapping and initialization offers

Cucumber docs recommend choosing an implementation for the same platform/language as the production code. If no suite exists, offer initialization only after explaining the detected platform, proposed tool, dependencies, folders, smoke scenario, and run command. Wait for explicit confirmation before changing dependencies or scaffold files.

| Project signal | Well-known tool(s) to offer | Initialization shape to propose |
| --- | --- | --- |
| Java on Maven/Gradle | Cucumber-JVM with JUnit Platform/JUnit/TestNG | Add test-scope `io.cucumber` dependencies consistent with existing test runner; create `src/test/resources/.../*.feature`, glue under `src/test/java`, and a runner/config if needed. |
| Kotlin/Scala/Groovy on JVM | Cucumber-JVM / Cucumber-Scala where appropriate | Follow existing JVM build tool and test runner; place features under test resources and glue under matching test source set. |
| JavaScript/TypeScript Node | Cucumber-JS (`@cucumber/cucumber`) | Add dev dependency with the repo package manager; create `features/*.feature`, `features/step_definitions/*`, optional `cucumber` npm script/config. |
| Ruby | Cucumber-Ruby | Add `cucumber` to `Gemfile`; use `bundle exec cucumber --init` or equivalent `features/` scaffold; add Rake task if repo uses Rake. |
| Rails | Cucumber-Ruby plus `cucumber-rails` | Offer Rails generator (`rails generate cucumber:install`) and note Capybara/DatabaseCleaner conventions. |
| Python app with pytest | `pytest-bdd` or Behave | Prefer `pytest-bdd` when pytest is already the test runner; otherwise Behave. Scaffold feature files and step modules according to the chosen runner. |
| Python app without pytest | Behave | Create `features/*.feature`, `features/steps/*`, and optional `behave.ini`. |
| PHP | Behat | Add Behat via Composer; create `behat.yml`, `features/*.feature`, and `features/bootstrap/FeatureContext.php`. |
| .NET/C# | Reqnroll or Xunit.Gherkin.Quick | Use existing test framework and NuGet style; add packages/config and feature/step files aligned with the solution. |
| Go | Godog | Add module dependency; create `features/` and Go test/runner glue consistent with existing `go test` workflow. |
| Rust | Cucumber-Rust | Add dev dependency and feature/step harness under tests according to current Rust layout. |
| C/C++ | Cucumber.cpp or amp-cucumber-cpp-runner | Offer only with project-specific confirmation because build integration varies. |
| Android/iOS | Cucumber-Android / Cucumberish | Offer only if mobile test infrastructure exists or the user wants mobile acceptance tests. |
| R, Perl, Lua, OCaml, D, Tcl, Clojure, JRuby, Jython, Gosu, Groovy legacy pages | Listed by Cucumber docs, but verify maintenance/project fit before recommending initialization. |

Initialization offer should include:

1. Detected language/platform and evidence files.
2. Selected tool and why it fits the project.
3. Dependencies to add, without hardcoding versions unless the repo already pins them.
4. Files/folders to create.
5. First smoke scenario and whether it should live at domain/API/browser level.
6. Command to run locally and CI/reporting follow-up.
7. Confirmation prompt before changes.

## Cucumber docs reviewed

Core BDD/Gherkin references:

- https://cucumber.io/docs/
- https://cucumber.io/docs/bdd
- https://cucumber.io/docs/bdd/better-gherkin
- https://cucumber.io/docs/bdd/discovery-workshop
- https://cucumber.io/docs/bdd/example-mapping
- https://cucumber.io/docs/bdd/examples
- https://cucumber.io/docs/bdd/history
- https://cucumber.io/docs/bdd/myths
- https://cucumber.io/docs/bdd/who-does-what
- https://cucumber.io/docs/gherkin
- https://cucumber.io/docs/gherkin/languages
- https://cucumber.io/docs/gherkin/reference
- https://cucumber.io/docs/gherkin/step-organization
- https://cucumber.io/docs/terms
- https://cucumber.io/docs/terms/user-story

Cucumber automation/guides:

- https://cucumber.io/docs/cucumber
- https://cucumber.io/docs/cucumber/api
- https://cucumber.io/docs/cucumber/checking-assertions
- https://cucumber.io/docs/cucumber/configuration
- https://cucumber.io/docs/cucumber/cucumber-expressions
- https://cucumber.io/docs/cucumber/debugging
- https://cucumber.io/docs/cucumber/environment-variables
- https://cucumber.io/docs/cucumber/mocking-and-stubbing-with-cucumber
- https://cucumber.io/docs/cucumber/reporting
- https://cucumber.io/docs/cucumber/state
- https://cucumber.io/docs/cucumber/step-definitions
- https://cucumber.io/docs/faq
- https://cucumber.io/docs/guides
- https://cucumber.io/docs/guides/10-minute-tutorial
- https://cucumber.io/docs/guides/anti-patterns
- https://cucumber.io/docs/guides/api-automation
- https://cucumber.io/docs/guides/browser-automation
- https://cucumber.io/docs/guides/continuous-integration
- https://cucumber.io/docs/guides/parallel-execution
- https://cucumber.io/docs/guides/testable-architecture
- https://cucumber.io/docs/guides/upgrading

Tools and installation references:

- https://cucumber.io/docs/tools
- https://cucumber.io/docs/tools/java
- https://cucumber.io/docs/tools/javascript
- https://cucumber.io/docs/tools/related-tools
- https://cucumber.io/docs/tools/ruby
- https://cucumber.io/docs/installation
- https://cucumber.io/docs/installation/java
- https://cucumber.io/docs/installation/javascript
- https://cucumber.io/docs/installation/ruby
- https://cucumber.io/docs/installation/kotlin
- https://cucumber.io/docs/installation/scala
- https://cucumber.io/docs/installation/golang
- https://cucumber.io/docs/installation/python
- https://cucumber.io/docs/installation/pytest-bdd
- https://cucumber.io/docs/installation/php
- https://cucumber.io/docs/installation/reqnroll
- https://cucumber.io/docs/installation/xunit-gherkin-quick
- https://cucumber.io/docs/installation/rust
- https://cucumber.io/docs/installation/cplusplus
- https://cucumber.io/docs/installation/amp-cucumber-cpp-runner
- https://cucumber.io/docs/installation/cwt-cucumber
- https://cucumber.io/docs/installation/android
- https://cucumber.io/docs/installation/ios
- https://cucumber.io/docs/installation/clojure
- https://cucumber.io/docs/installation/groovy
- https://cucumber.io/docs/installation/gosu
- https://cucumber.io/docs/installation/jruby
- https://cucumber.io/docs/installation/jython
- https://cucumber.io/docs/installation/d
- https://cucumber.io/docs/installation/gobdd
- https://cucumber.io/docs/installation/gocuke
- https://cucumber.io/docs/installation/lua
- https://cucumber.io/docs/installation/ocaml
- https://cucumber.io/docs/installation/perl
- https://cucumber.io/docs/installation/r
- https://cucumber.io/docs/installation/tcl
- https://cucumber.io/docs/contributing
