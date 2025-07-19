# 🧠 HelenKella Godmode OS: The Anti-Platform for the Post-Platform Era

Welcome to the unified, canonical monorepo for HelenKella Godmode OS and all its branches—Mysconduct, Satirium, Lorefront, and beyond.

> This monorepo fully integrates all agents, utilities, workflows, and docs from every core platform and repo.  
> If you’re working on any branch/platform, **start here, and all context will flow from this root.**

---

## 🌳 Monorepo Structure (Unified)

```
/godmode-stack/
├── apps/
│   ├── dashboard/           # Operator Dashboard (cross-platform)
│   ├── helenkella-web/      # Core account system & landing
│   ├── mysconduct-web/      # Mysconduct app (high-consent NSFW, creator-first)
│   ├── satirium-web/        # The Satirium (satire/critique/gamification)
│   ├── lorefront-web/       # Lorefront™ (chaos tech, gamedev)
│   └── cli/                 # CLI tools (mission enqueuer, admin)
├── packages/
│   ├── agents/              # ALL daemons/agents (core + branch-specific)
│   │    ├── CognitiveCoreDaemon@1.js
│   │    ├── domainOpsDaemon@1.js
│   │    ├── vibeWrangler@1.js
│   │    ├── consentDaemon@1.js            # Mysconduct
│   │    ├── gamificationDaemon@1.js       # Satirium
│   │    ├── lorefrontChaosDaemon@1.js     # Lorefront
│   │    └── ... (see AGENT_GLOSSARY.md)
│   ├── schemas/              # JSON Schemas (shared + platform)
│   ├── utils/                # Core utilities (logger, cloudflare, etc.)
├── runtime/
│   ├── config/               # Multi-domain, multi-branch configs
│   ├── logs/
│   ├── missions/
│   ├── scheduler/
│   └── temp/
├── docs/
│   ├── PRODUCTION_GO_LIVE_SOP.md
│   ├── OPERATOR_RUNBOOK.md
│   ├── AGENT_GLOSSARY.md
│   ├── MYS_CONDUCT_README.md
│   ├── SATIRIUM_README.md
│   ├── LOREFRONT_README.md
│   └── README.md
├── .env.example
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

## 🤖 AGENT GLOSSARY (CROSS-REPO, BRANCH-AWARE)

See `/docs/AGENT_GLOSSARY.md` for a comprehensive, cross-repo/branch list of all daemons and their roles, including:

- **Core Orchestration:** CognitiveCoreDaemon, schedulerDaemon
- **Domain/DNS:** domainOpsDaemon
- **Consent & Safety:** consentDaemon (Mysconduct), vibeWrangler, sentinel
- **Monetization:** monetizationDaemon, legalKitDaemon
- **Satire/Gamification:** gamificationDaemon (Satirium)
- **Chaos/Game:** lorefrontChaosDaemon (Lorefront)
- **Content:** contentDaemon, sigilDaemon, etc.
- ...and all others (see full glossary)

---

## 🛠 Platform-Specific Docs

- [Mysconduct Branch README](./docs/MYS_CONDUCT_README.md)
- [Satirium Branch README](./docs/SATIRIUM_README.md)
- [Lorefront Branch README](./docs/LOREFRONT_README.md)

Each describes unique agents, flows, and rituals for that platform, but **all agent logic is unified in `/packages/agents/` and referenced in the master glossary**.

---

## 🧬 Unified Config (.env/.json)

All platform/branch domains, API keys, and feature flags are managed centrally.  
Example:  
```
CANONICAL_DOMAIN=helenkella.com
BRANCH_DOMAINS=mysconduct.com,satirium.com,lorefront.com
MYS_CONDUCT_FEATURES=consent,gaslight_scrubber
SATIRIUM_FEATURES=critique,gamification
LOREFRONT_FEATURES=chaos_engine,game_sdk
```

---

## 💡 Operator Onboarding & SOPs

- **Start here:** `/docs/OPERATOR_RUNBOOK.md` for cross-platform ops, onboarding, and troubleshooting.
- **Deploy here:** `/docs/PRODUCTION_GO_LIVE_SOP.md` for full-system launch (all branches, all domains).
- **Agent reference:** `/docs/AGENT_GLOSSARY.md` for every daemon (core + branch).

---

> **This monorepo is now the living, unified source of truth for all HelenKella OS stacks and branches.**  
> If you’re building, debugging, or extending any part, start here and all context will be correct.
