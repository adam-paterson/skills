# Software Skills

Software agent skills live in `skills/software/<skill-name>/`.

## Current Skills

| Skill | Purpose |
| --- | --- |
| `delivery-workflow` | Route a spec package to the next owned or external workflow stage. |
| `setup-agent-workflow` | Prepare a repository with the enterprise spec-package convention. |
| `feature-discovery` | Discover feature/capability opportunities from product fit, user jobs, adjacent research, and commercial canvas hypotheses. |
| `revisit-plan` | Resolve a specific planning question or revise an existing plan's priorities, dependencies, and scope. |

These skills are intentionally separate so agents can invoke one workflow step without loading the whole lifecycle. When a spec package exists, workflow skills use it as their shared git-tracked workspace.
