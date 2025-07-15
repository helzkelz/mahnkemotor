# Security & Consent

- **Zero-Retention by Default:** User data is ephemeral unless explicitly consented.
- **Encryption:** All sensitive state and tokens encrypted at rest.
- **API Key Checks:** Internal endpoints require `INTERNAL_API_KEY`.
- **Consent-First:** All high-consent features (Mysconduct, Satirium, etc.) require explicit, timestamped consent.

See also: [docs/AGENTS.md](AGENTS.md) for daemons responsible for consent, safety, and compliance.