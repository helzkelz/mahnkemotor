# HelenCoreOS Agent System Blueprint

This document defines the full structure for building, executing, and integrating agents within the HelenCoreOS platform. It includes schema logic, SDK hooks, licensing tiers, and deployment automation.

---

## 1. Agent Overview

Agents in HelenCoreOS are versioned, schema-bound runtime workers. Each agent handles a defined action or ritual process.

### Example:
```json
{
  "name": "contentDaemon",
  "version": "agent@v1",
  "schema": "ActionSchemaV1",
  "description": "Handles content generation and formatting rituals."
}
```

---

## 2. Schema Enforcement

Agents use `ActionSchemaV1` to validate input and output:

### Input Example:
```json
{
  "context": {
    "userId": "abc123"
  },
  "params": {
    "prompt": "Create onboarding ritual"
  }
}
```

### Output Contract:
```json
{
  "output": {
    "steps": ["Step 1", "Step 2"],
    "metadata": {}
  },
  "success": true
}
```

---

## 3. SDK Runtime: `/sdk/execute`

Agents are executed via the runtime API endpoint with schema and version headers:

### Headers:
```
Authorization: Bearer {token}
Content-Type: application/json
x-execution-schema-version: 1.0
x-agent-version: agent@v1
```

---

## 4. Deployment Chain

Each agent is auto-deployed into the runtime container with:
- Schema validation
- Token-based authentication
- Execution log
- Optional webhook callback

---

## 5. License Tiers (Access Control)

| Tier        | Permissions                                |
|-------------|--------------------------------------------|
| Free        | Read-only agents, public rituals only      |
| Creator+    | Can deploy rituals and install agents      |
| Commercial  | Full dashboard + API quota                 |
| Enterprise  | Source license, SLAs, custom agents        |

---

## 6. Ritual Pipeline (Agent Chain Logic)

Rituals can chain multiple agents:
```json
{
  "ritual": "OnboardNewUser",
  "chain": ["fetchUserData@v1", "createUserDoc@v1", "sendWelcomeNote@v1"]
}
```

---

## 7. Client Integration (Node.js)

Use the `clientAPI.js` to execute agents securely:
```js
import { executeAgent } from './clientAPI.js';

await executeAgent({
  agent: 'agent@v1',
  input: {
    context: { userId: 'abc123' },
    params: { prompt: 'Start onboarding' }
  },
  token: process.env.HELENCORE_API_KEY
});
```

---

## 8. Roadmap
- [ ] Add persistent agent logs
- [ ] Enable multi-agent replay sessions
- [ ] Webhook listener dashboard
- [ ] CLI devkit

---

## 9. Post-Execution Hooks
- Trigger merch drops
- Discord ritual alerts
- Case study generation

---

This spec defines the base blueprint of the agent system. Extendable via adapters, rituals, and schema-linked flows.

