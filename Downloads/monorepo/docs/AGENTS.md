# The Daemon Toolbox (Agent Glossary)

This is the comprehensive list of all intelligent agents within the Godmode OS, defining their function and purpose.

## Core Orchestration & Infrastructure Daemons

- **CognitiveCoreDaemon@1**: The central AI brain. Interprets natural language missions, plans execution chains using available tools, and orchestrates agent calls.
- **schedulerDaemon@1**: Detects `.mission` files in the `runtime/scheduler` directory and enqueues them into the Mission Queue.
- **repairDaemon@1**: Detects agent failures and attempts to patch code or outputs, and logs auto-corrections.
- **statusDaemon@1**: Updates `runtime/logs/status.json` and the production database with current ritual/mission health and progress. Publishes real-time updates to Redis.
- **reflectionDaemon@1**: Analyzes recent ledger and status logs to suggest improvements, identify patterns, and inform future `CognitiveCoreDaemon` missions.
- **insightDaemon@2**: Statistically evaluates ritual performance, user interactions, and platform data to generate new, high-level prompt contexts for the `CognitiveCoreDaemon`.
- **compareDaemon@1**: Diffs two ritual runs for validation, versioning, or replay, essential for A/B testing or quality assurance.
- **archiveDaemon@1**: Compresses and archives ritual drops and associated metadata post-deploy, managing storage and historical records.
- **meshDaemon@1**: Synchronizes rituals and state with other Godmode nodes in a distributed environment, ensuring consistency across deployments.
- **remoteReceiverDaemon@1**: Receives triggers or agent commands from remote operators or integrated systems securely.

## Content & Engagement Daemons

- **contentDaemon@1**: Generates static ritual HTML content (e.g., `index.html`, `post.md`) from payload, handling formatting and embedding.
- **vrDropDaemon@1**: Synthesizes AV script into text or audio assets, enabling creation of voiceovers, podcasts, or video scripts.
- **sigilDaemon@1**: Generates unique SVG sigils based on ritual slug and content hash, providing symbolic representation for drops and platforms.
- **RITUALFORGER@1**: Builds personalized ritual, challenge, or initiation flows for onboarding, adapting to user choices and logging decisions. Flags users who skip rituals.

## Platform-Specific & Specialized Daemons

- **crawlerDaemon@1**: Fetches and extracts clean text content from a given public URL or a search query for research and data ingestion.
- **grantWriterDaemon@1**: Drafts comprehensive grant proposals based on research, internal knowledge, and specific funding criteria.
- **profileDaemon@1**: Manages user and creator profiles, including archetypes, preferences, and platform-specific metadata.
- **consentDaemon@1**: Creates, revokes, and verifies timestamped consent records for interactions within high-consent branches like Mysconduct.
- **monetizationDaemon@1**: Handles payment processing, subscription management, and digital product (e.g., Zine) sales, integrating with various payment APIs.
- **gamificationDaemon@1**: Manages points, badges, leaderboards, and other gamified elements for platforms like The Satirium.
- **investorReportDaemon@1**: Gathers data from `cuaDaemon` and `insightDaemon` to generate structured investor update documents and reports.

## User Experience & Safety Daemons (Neurodivergent-Native)

- **VIBEWRANGLER@1**: (Personality Matcher + UX Filter) Routes users based on interaction patterns, adjusts agent tones/speed, and escalates to `SENTINEL` if user is overwhelmed.
- **NEUROLOCKER@1**: (Feature Lock/Unlock Based on Readiness) Prevents overwhelm by gradually unlocking features based on demonstrated user readiness, skill, or stability.
- **FRACTALMAPPER@1**: (Trait-Based UX Tailor) Detects user neurotype and usage patterns to adapt UX flows, reduce friction, and flag signs of burnout to `SENTINEL`.
- **SENTINEL@1**: (Flagcatcher + Safety Bastard) Tracks red flags, bans, and incidents, initiating cooldowns, context nudges, or hard bans. Prioritizes user well-being and can route to "Wholesome Mode™."

## Utility & Integration Daemons

- **webhookDaemon@1**: Notifies via Discord or other APIs when ritual drops complete, errors occur, or specific events are triggered.
- **legalKitDaemon@1**: Generates `LICENSE.md`, Terms of Service, and other legal documents from schemas in triggers, ensuring IP compliance.
- **cuaDaemon@1**: (Content Usage Analytics) Logs granular events to the `ritual-ledger` for tracking ritual performance, user engagement, and platform-specific metrics.
- **knowledgeDaemon@1**: Manages a private Vector Database for Retrieval Augmented Generation (RAG), storing your past work, notes, and successful rituals for the `CognitiveCoreDaemon` to access.