Parse the attached monorepo and docs. For each file, extract:

- **File path/name**
- **Purpose** (what is this for?)
- **Key entities/agents/daemons** (names, roles, parameters)
- **Config/licensing/security/workflow details** (env vars, license tiers, mission flows)

Group and summarize under these headings:

- Monorepo Structure
- Agent Glossary
- Setup/Onboarding
- Licensing & IP
- Security & Compliance
- Workflows
- Platform/Branch-Specific

For each, provide:
- Concise description
- Key quotes or code snippets if needed
- Cross-references (e.g. “see AGENT_GLOSSARY.md”)

Output: structured markdown, easy for downstream agent or operator use.