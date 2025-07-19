# 🚦 Godmode OS Production Go-Live SOP

## 1. Domain & Cloudflare

- [x] **domainOpsDaemon@1** implemented and on a scheduler (see `/packages/agents/domainOpsDaemon@1.js`).
- [x] All Cloudflare API tokens/zone IDs are encrypted secrets.
- [x] Wildcard and custom domains resolve and route (test: `curl -I https://{custom}.mysconduct.com`).

## 2. Secrets, Compliance, Security

- [x] All secrets stored in secrets manager, not in `.env` or source.
- [x] SSL enforced everywhere (Cloudflare Full Strict, app auto-redirects HTTP→HTTPS, HSTS).
- [x] Privacy Policy & ToS linked in all public UIs.

## 3. Monitoring & Recovery

- [x] Structured logging active and off-host backups scheduled.
- [x] Discord/Email/Operator alerts tested.
- [x] DB and Redis backup/restore tested.

## 4. Real-World Ritual Test

- [x] Payment→license→drop→notification flow run in prod with real Stripe/Discord.
- [x] Ritual event chain visible in dashboard and ritual ledger.

## 5. Operator & User Access

- [x] Dashboard/admin behind auth.
- [x] Franchise/partner onboarding works (including domain).

## 6. Deploy & Cache

- [x] Zero-downtime deploy (rolling/blue-green or host supports live update).
- [x] Cloudflare cache purge on deploy.

## 7. Docs & SOPs

- [x] All runbooks and operator docs in `/docs/`.
- [x] Offboarding/emergency SOP in place.

---
**Operator Ritual:** Drop and run `activate-production.mission` to fully enable all daemons and open system to live traffic.