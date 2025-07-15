# Monorepo Structure

This repository is organized using `pnpm` and `Turborepo` to manage interconnected applications and packages.

```
/godmode-stack/
├── apps/                        # User-facing applications and interfaces
│   ├── dashboard/               # Operator Dashboard (Your Command & Control)
│   ├── helenkella-web/          # HelenKella.com Landing Page & Core Account System
│   ├── mysconduct-web/          # Frontend for Mysconduct platform
│   ├── satirium-web/            # Frontend for The Satirium platform
│   ├── lorefront-web/           # Frontend for Lorefront™ platform
│   └── cli/                     # Command Line Interface tools (e.g., mission enqueuer)
├── packages/                    # Shared code, daemons, schemas
│   ├── agents/                  # The Daemon Toolbox (All intelligent agents)
│   ├── schemas/                 # JSON Schemas for data validation (ActionSchemaV1, ConsentSchema, ProfileSchema)
│   ├── utils/                   # Core utilities (AI clients, logger, status manager, database, knowledge retriever)
├── runtime/                     # Operational state and temporary files
│   ├── logs/                    # Structured logs, ritual ledger, status data
│   ├── missions/                # Store incoming mission definitions (for debugging/audit)
│   ├── scheduler/               # Temporary directory for .mission files to be picked up by worker
│   └── temp/                    # Temporary files for daemon operations (e.g., crawl data)
├── .github/workflows/           # GitHub Actions for CI/CD, scheduled operations, health checks
├── .env.example                 # Example environment variables (copy to .env)
├── package.json                 # Monorepo-level scripts and dependencies
├── pnpm-workspace.yaml          # Defines monorepo packages
└── turbo.json                   # Turborepo pipeline configuration for builds/dev
```