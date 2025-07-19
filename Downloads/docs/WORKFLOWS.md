# Workflows

## Mission Lifecycle

1. **Mission Enqueue:** Via API, CLI, or dashboard.
2. **Validation:** `testDaemon@1` checks against `ActionSchemaV1`.
3. **Orchestration:** `CognitiveCoreDaemon@1` plans and executes mission steps.
4. **Agent Chaining:** Each agent/daemon performs its specialized sub-tasks.
5. **Logging:** All actions, errors, and status changes are logged to the `ritual-ledger`.
6. **Status Update:** `statusDaemon@1` updates dashboard and notifies webhooks.
7. **Reflection & Insight:** `reflectionDaemon@1` and `insightDaemon@2` analyze results for future improvement.

## Example: Grant Proposal Flow

- Operator submits: "Draft a grant proposal for the Sovereign Tech Fund, researching their past projects."
- `grantWriterDaemon@1` is called, which may chain to `crawlerDaemon@1` (for research), `contentDaemon@1` (for formatting), and `sigilDaemon@1` (for branding).
- `legalKitDaemon@1` reviews compliance.
- Result: Proposal draft, status update, and logs in dashboard.

## Compliance & Consent

- All sensitive or high-consent actions must go through `consentDaemon@1` and be auditable.