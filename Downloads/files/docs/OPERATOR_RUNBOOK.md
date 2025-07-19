# 🧰 Operator Runbook: Rituals, Recovery, and Emergency

## Ritual Run-Through

1. Drop a `.mission` file in `/runtime/missions/` with a real-world intent.
2. Watch dashboard for mission queue, daemon status.
3. Complete payment (if monetized), check license status in dashboard.
4. Confirm ritual drop, notification, and full event chain in ritual ledger.

## Backup/Restore

- **DB:** Use `pg_dump` and `pg_restore` (documented in `/docs/BACKUP.md`).
- **Redis:** Use `redis-cli save` and backup `dump.rdb`.
- **Logs:** Archive `/runtime/logs/` weekly/monthly.

## Emergency

- If dashboard/admin breached, rotate secrets and lock Cloudflare access.
- If domains go down, run `domainOpsDaemon@1 scan_and_heal`.
- If payment fails, check Stripe logs, daemon, and webhook status.

## Offboarding/Franchise

- Remove partner from profileDaemon, revoke API/domain via domainOpsDaemon.
- Archive their data with complianceDaemon if requested.

---
> Operator is always sovereign. If in doubt: lock, heal, and escalate.