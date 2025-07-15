# 🧠 HelenKella Godmode OS: The Anti-Platform for the Post-Platform Era

Welcome to the unified, canonical monorepo for the HelenKella Godmode OS and its four sovereign branches.

---

## 🌳 Monorepo Structure

```
/godmode-stack/
├── apps/
│   ├── dashboard/
│   ├── helenkella-web/
│   ├── mysconduct-web/
│   ├── mysmanaged-web/
│   ├── thesatirium-web/
│   └── cli/
├── packages/
│   ├── agents/
│   ├── schemas/
│   └── utils/
├── runtime/
│   ├── logs/
│   ├── missions/
│   ├── scheduler/
│   └── temp/
├── .github/workflows/
├── .env.example
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 🏁 Quickstart

1. `pnpm install`
2. Copy `.env.example` → `.env` and fill in secrets
3. Start DB/Redis, then:  
   - `pnpm dev` (all apps)  
   - or `pnpm --filter dashboard dev` (just dashboard)
4. Build for prod: `pnpm build`

---

## Sovereign Branches

| App               | Domain             | Purpose                        |
|-------------------|--------------------|--------------------------------|
| helenkella-web    | helenkella.com     | Central hub & account system   |
| mysconduct-web    | mysconduct.com     | Creator fortress (high-consent)|
| mysmanaged-web    | mysmanaged.com     | B2B/Franchise/Business portal  |
| thesatirium-web   | thesatirium.com    | Satirical critique/IP engine   |

All code, env variables, and docs refer only to these four branches.

---