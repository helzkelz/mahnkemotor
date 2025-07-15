# Godmode-Stack Monorepo & System Overview

## Monorepo Structure

- **Root:** `/godmode-stack/`
  - Centralizes all code, configs, and docs using pnpm and Turborepo.
  - Key files: `package.json` (workspaces, scripts), `pnpm-workspace.yaml`, `turbo.json` (pipeline).
  - `.env` for secrets (never in source for prod), `.gitignore`, `Dockerfile`.

- **/apps/**
  - `dashboard/`: Operator UI (Next.js/React). APIs for mission queue, live status (SSE), logs, and mission control.
  - `cli/`: CLI tools for enqueuing missions.
  - `mysconduct-web/`, `satirium-web/`, `lorefront-web/`: Platform-specific Next.js frontends.
  - (implicit) `drops/`: Generated static ritual output.

- **/packages/**
  - `agents/`: All daemons, agent registry, agent stubs.
  - `schemas/`: JSON schemas for action/mission validation.
  - `utils/`: Logger, config, AI clients, mission runner, error handler, status manager.

- **/runtime/**
  - `logs/`: `ritual-ledger.json` (event log), `status.json` (live state), `harm_reduction_log.json`.
  - `missions/`, `scheduler/`: Mission files and triggers.
  - `mission_queue.js`: Redis-backed mission queue.
  - `worker.js`: Main OS loop, dequeues and executes missions.

- **.github/workflows/**: CI/CD, automation, orchestrator triggers.

---

## Agent Glossary

- **CognitiveCoreDaemon@1**: Central orchestrator, interprets mission, plans agent chain, executes, self-corrects.
- **tool_schemas.js**: Defines agent LLM interface (JSON schema for function calling).
- **selfWriterDaemon@1**: Scaffolds new agents.
- **profileDaemon@1**: Manages user/creator profiles.
- **consentDaemon@1**: Manages explicit, timestamped consent for Mysconduct.
- **monetizationDaemon@1**: Payments, subscriptions, entitlement.
- **gamificationDaemon@1**: Points, badges, leaderboards (Satirium).
- **investorReportDaemon@1**: Aggregates analytics for investor updates.
- **contentDaemon@1**: Generates ritual HTML/content.
- **ritualDropDaemon@1**: Packages/deploys ritual artifacts.
- **ritualLogDaemon@1**: Writes to ritual ledger.
- **statusDaemon@1**: Updates mission/ritual status.
- **testDaemon@1**: Schema validation, dry-run, red-team simulation.
- **reflectionDaemon@1**, **insightDaemon@2**: System self-improvement, analyzes logs for new missions.
- **webhookDaemon@1**: Notifies via Discord/webhook.
- **repairDaemon@1**: Applies code fixes/self-healing.
- **adapterDaemon@1**: Service integration.
- **crawlerDaemon@1**: Fetches/cleans data from URLs.
- **grantWriterDaemon@1**: Multi-step grant proposal author.
- **cuaDaemon@1**: Logs analytic events.
- **knowledgeDaemon@1**: RAG/private vector DB for agent memory.
- **VIBEWRANGLER, NEUROLOCKER, FRACTALMAPPER, SENTINEL**: UX tailoring, safety, feature gating, flagcatching (ND-focused).
- **RITUALFORGER**: Personalized onboarding flows.
- **ContentPolicyDaemon, SanitizerDaemon, RiskAssessorDaemon**: Safety, filtering, risk scoring (AI governance).
- **Gaslight Scrubber, Legal Rights Daemon**: Abuse detection, legal support.

---

## Setup & Onboarding

- Prereqs: Node.js 18+, pnpm, DB/Redis, AI API keys.
- `init.sh`: Bootstraps structure.
- `.env`: Configure secrets.
- `pnpm install` then start services.
- Create `.mission` files to trigger first runs.
- Operator dashboard at `/apps/dashboard`.

---

## Licensing & IP

- Proprietary deep-tech, not SaaS. Defensible agent architecture.
- Four tiers: Free/Internal, Creator+ ($99+), Commercial ($499+), Enterprise (custom).
- Monetization enforced at agent level.
- IP includes unique agents (e.g. VibeWrangler™), trauma-informed code, ritual engine.
- Franchise/B2B via HelenHaus™—white-label, modules, full-stack.

---

## Security & Compliance

- Zero-retention, local-first. Ollama/Mistral models can run offline.
- Neurodivergent-first UX: care logic, trauma-informed, consent-first.
- Consent enforced by `consentDaemon`, ND safety by VIBEWRANGLER, FRACTALMAPPER, SENTINEL.
- Secrets in env or secret manager, never source.
- Entitlement checks: server-side validation, AppCheck.
- Immutable logs for harm reduction flows.
- AI governance: pre/post-processing, risk scoring, red-team simulation.

---

## Workflows

- Missions: `.mission` (YAML), natural-language intent.
- Scheduler/worker: Redis queue, missions dequeued and executed by CognitiveCoreDaemon.
- LLM plans function-calling chain, agents execute, status/logs updated.
- Post-hooks (e.g. notifications, logging, reflection).
- Error handling and self-repair integrated.
- Example: Grant writing mission triggers chain: crawl → knowledge → author → legal → deploy → notify → log.

---

## Platform/Branch-Specific

- **Mysconduct:** High-consent NSFW, zine builder, body doubling, trauma-informed rituals, strong creator protections.
- **Satirium:** Satirical, gamified critique, points/badges.
- **Mysmanaged:** Business management, investor reporting.
- **mys.OS:** ND-centric, anti-punishment, cognitive safety.
- **HelenHaus™:** B2B franchise, all-in-one business OS, licensing portal.
- **HelenKella.com:** Main landing, manifestos, movement.
- **Lorefront™:** Gamified chaos, Discord-linked arcade modules.

---

**Operator is always sovereign. All actions, access, and output must align with licensing and care logic.**