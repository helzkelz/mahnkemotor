**Project Scope: Docusaurus Site for HELENKELLA // MYS.OS**

---

## 0. Monorepo Integration

This Docusaurus instance resides within a larger monorepo. To integrate:

1. **Workspace Registration**\
   In the root `package.json`, add under `workspaces`:

   ```json
   {
     "workspaces": [
       "packages/*",
       "helenkella"
     ]
   }
   ```

   Place the `helenkella/` folder alongside other packages (e.g., `packages/*`).

2. **Shared Dependencies**

   - Install Docusaurus dependencies from the monorepo root:
     ```bash
     yarn workspace helenkella add @docusaurus/core @docusaurus/preset-classic prism-react-renderer
     ```
   - This avoids duplication and leverages hoisting.

3. **Scripts**\
   Expose Docusaurus scripts in the root `package.json`:

   ```json
   {
     "scripts": {
       "docs:start": "yarn workspace helenkella start",
       "docs:build": "yarn workspace helenkella build",
       "docs:deploy": "yarn workspace helenkella deploy"
     }
   }
   ```

4. **Cross-Package Imports**\
   If you need to share MDX components or theme overrides, reference them via:

   ```json
   {
     "dependencies": {
       "@myorg/ui": "workspace:packages/ui"
     }
   }
   ```

   Then import in Docusaurus pages:

   ```js
   import { MyComponent } from '@myorg/ui';
   ```

5. **CI/CD**\
   Ensure your CI workflow builds from the monorepo root:

   ```yaml
   - run: yarn install
   - run: yarn docs:build
   ```

---

## 1. Repository File Structure

````plaintext
helenkella/               # Docusaurus package within monorepo
├── docs/                  # Markdown documentation
│   ├── substances/
│   │   ├── alcohol.md
│   │   ├── cocaine.md
│   │   ├── meth.md
│   │   ├── benzos.md
│   │   ├── opioids.md
│   │   ├── psychedelics.md
│   │   ├── lsd.md
│   │   ├── mdma.md
│   │   ├── ketamine.md
│   │   ├── dxm.md
│   │   ├── fentanyl.md
│   │   ├── ghb.md
│   │   └── rc-benzos.md
│   ├── protocols/
│   │   ├── test-kits.md
│   │   ├── tapering.md
│   │   ├── emergency.md
│   │   ├── stack-strategies.md
│   │   └── visual-guide-recovery.md
│   ├── fieldcraft/
│   │   ├── stealth-lab.md
│   │   ├── counter-surveillance.md
│   │   └── urban-survival.md
│   ├── intel/
│   │   ├── glossary.md
│   │   ├── redflags.md
│   │   └── supplier-risk.md
│   └── mental-health/      # New: mental health resources
│       ├── anxiety.md
│       ├── depression.md
│       ├── coping-strategies.md
│       └── peer-support.md
├── sidebars.js            # Sidebar configuration
├── docusaurus.config.js   # Main Docusaurus configuration
├── package.json           # Project metadata & dependencies
├── src/
│   ├── pages/
│   │   └── index.md       # Homepage content
│   └── css/
│       └── custom.css     # Custom styles (dark theme tweaks)
├── static/
│   └── img/
│       ├── logo.png       # Navbar logo
│       └── skull.ico      # Favicon
└── README.md              # Project overview & local setup instructions
```plaintext
helenkella/               # Docusaurus package within monorepo
├── docs/                  # Markdown documentation
│   ├── substances/
│   │   ├── alcohol.md
│   │   ├── cocaine.md
│   │   ├── meth.md
│   │   ├── benzos.md
│   │   ├── opioids.md
│   │   ├── psychedelics.md
│   │   ├── lsd.md
│   │   ├── mdma.md
│   │   ├── ketamine.md
│   │   ├── dxm.md
│   │   ├── fentanyl.md
│   │   ├── ghb.md
│   │   └── rc-benzos.md
│   ├── protocols/
│   │   ├── test-kits.md
│   │   ├── tapering.md
│   │   ├── emergency.md
│   │   ├── stack-strategies.md
│   │   └── visual-guide-recovery.md
│   ├── fieldcraft/
│   │   ├── stealth-lab.md
│   │   ├── counter-surveillance.md
│   │   └── urban-survival.md
│   └── intel/
│       ├── glossary.md
│       ├── redflags.md
│       └── supplier-risk.md
├── sidebars.js            # Sidebar configuration
├── docusaurus.config.js   # Main Docusaurus configuration
├── package.json           # Project metadata & dependencies
├── src/
│   ├── pages/
│   │   └── index.md       # Homepage content
│   └── css/
│       └── custom.css     # Custom styles (dark theme tweaks)
├── static/
│   └── img/
│       ├── logo.png       # Navbar logo
│       └── skull.ico      # Favicon
└── README.md              # Project overview & local setup instructions
````

plaintext helenkella/               # Docusaurus package within monorepo ├── docs/                  # Markdown documentation │   └── ... ├── sidebars.js            # Sidebar configuration ├── docusaurus.config.js   # Docusaurus config ├── package.json           # Docusaurus metadata & scripts ├── src/ │   ├── pages/ │   │   └── index.md       # Homepage │   └── css/custom.css     # Styles ├── static/img/            # Assets │   ├── logo.png │   └── skull.ico └── README.md              # Project overview & setup

````

---

## 4. README.md Template

Create `helenkella/README.md` with:

```markdown
# HELENKELLA – MYS.OS Documentation Site

A living atlas of resilience and healing, powered by Docusaurus and integrated into a monorepo.

## Setup

```bash
yarn install          # install all workspaces
cd helenkella
yarn install          # install Docusaurus dependencies
````

## Development

```bash
yarn docs:start       # start dev server for docs
```

## Build & Deploy

```bash
yarn docs:build       # build static site
yarn docs:deploy      # deploy to GitHub Pages or configured target
```

## Structure

- `docs/` – content pages
- `src/` – custom pages and styles
- `sidebars.js` – navigation tree
- `docusaurus.config.js` – site config

---

## 5. .gitignore

Add `helenkella/.gitignore`:

```
node_modules/
build/
.cache/
.DS_Store
```

---

## 6. CI Workflow (GitHub Actions)

```yaml
name: Build and Deploy Docs

on:
  push:
    branches: [ main ]
    paths:
      - 'helenkella/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: 'recursive'
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: yarn install
      - run: yarn docs:build
        working-directory: helenkella
      - run: yarn docs:deploy
        working-directory: helenkella
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 7. Template: Red Flags (docs/intel/redflags.md)

```markdown
---
title: Supply Chain Red Flags
description: Signs and indicators of adulterated or unsafe substances
slug: /docs/intel/redflags
---

# 🚩 Supply Chain Red Flags

> “If it doesn’t feel right, it probably isn't.”

## Color & Appearance
- **Unnatural hues**: Bright neon powders may indicate dyes or synthetic adulterants.
- **Inconsistent texture**: Patches of crusty clumps or oily sheen suggest moisture damage or cutting agents.
- **Sediment or oil**: Freebase compounds tinted with oil or wax can signal improper synthesis or adulteration.

## Taste & Smell
- **Chemical aftertaste**: Bitter metallic or soapy flavors can indicate toxic reagents (e.g., solvents, heavy metals).
- **Strong chemical odor**: Solvent residues often smell like acetone, ether, or ammonia.
- **Sweet masking**: Sugary coatings may hide bitter adulterants like levamisole.

## Packaging & Source
- **Unlabeled containers**: Lack of batch info or origin details.
- **Unusual seals**: Broken or re-sealed zip-locks, tape patches, or mismatched labels.
- **Price anomalies**: Significantly lower price than market suggests bulk cutting or poor quality.

## Behavioral Indicators
- **Overly aggressive pushing**: Sellers who downplay risks or pressure large purchases.
- **Inconsistent stories**: Varying origin claims or supplier names.
- **Rapid availability of large amounts**: May indicate unknown supply chain or stolen goods.

## Test Kit Alerts
- **Weak color change**: Faint or unclear reactions on Marquis, Mandelin, or Ehrlich tests.
- **No reaction**: Complete absence of expected color shift indicates possible new or untested substance.
- **Unexpected precipitate**: Solid residues forming can mean heavy metals or insoluble cuts.

```

---

## 8. Codex Prompt & Branch Setup

**Branch Naming**

- Create a dedicated feature branch off the monorepo root:
  ```bash
  git checkout -b feature/mysos-codex-setup
  ```

**Codex Generation Script** Add a utility script at `helenkella/scripts/codex_generate.sh`:

````bash
#!/usr/bin/env bash
# codex_generate.sh: Generate Docusaurus markdown templates via OpenAI Codex
# Usage: ./codex_generate.sh <template_type> <output_path>

TEMPLATE_TYPE=$1  # e.g., 'substance', 'protocol', 'mental-health'
OUTPUT_PATH=$2    # e.g., '../docs/substances/newdrug.md'

if [ -z "$TEMPLATE_TYPE" ] || [ -z "$OUTPUT_PATH" ]; then
  echo "Usage: $0 <template_type> <output_path>"
  exit 1
fi

PROMPT="Generate a Docusaurus markdown file for a $TEMPLATE_TYPE guide with title, description, headings for profile, risks, field strategies, and reintegration."
openai api completions.create \
  --model code-davinci-002 \
  --prompt "$PROMPT" \
  --max-tokens 800 \
  --temperature 0.2 \
  > $OUTPUT_PATH

echo "Template for $TEMPLATE_TYPE created at $OUTPUT_PATH"
```markdown
---
title: Supply Chain Red Flags
description: Signs and indicators of adulterated or unsafe substances
slug: /docs/intel/redflags
---

# 🚩 Supply Chain Red Flags

> “If it doesn’t feel right, it probably isn't.”

## Color & Appearance
- **Unnatural hues**: Bright neon powders may indicate dyes or synthetic adulterants.
- **Inconsistent texture**: Patches of crusty clumps or oily sheen suggest moisture damage or cutting agents.
- **Sediment or oil**: Freebase compounds tinted with oil or wax can signal improper synthesis or adulteration.

## Taste & Smell
- **Chemical aftertaste**: Bitter metallic or soapy flavors can indicate toxic reagents (e.g., solvents, heavy metals).
- **Strong chemical odor**: Solvent residues often smell like acetone, ether, or ammonia.
- **Sweet masking**: Sugary coatings may hide bitter adulterants like levamisole.

## Packaging & Source
- **Unlabeled containers**: Lack of batch info or origin details.
- **Unusual seals**: Broken or re-sealed zip-locks, tape patches, or mismatched labels.
- **Price anomalies**: Significantly lower price than market suggests bulk cutting or poor quality.

## Behavioral Indicators
- **Overly aggressive pushing**: Sellers who downplay risks or pressure large purchases.
- **Inconsistent stories**: Varying origin claims or supplier names.
- **Rapid availability of large amounts**: May indicate unknown supply chain or stolen goods.

## Test Kit Alerts
- **Weak color change**: Faint or unclear reactions on Marquis, Mandelin, or Ehrlich tests.
- **No reaction**: Complete absence of expected color shift indicates possible new or untested substance.
- **Unexpected precipitate**: Solid residues forming can mean heavy metals or insoluble cuts.


---
yaml
name: Build and Deploy Docs

on:
  push:
    branches: [ main ]
    paths:
      - 'helenkella/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: 'recursive'
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: yarn install
      - run: yarn docs:build
        working-directory: helenkella
      - run: yarn docs:deploy
        working-directory: helenkella
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
````

\` helenkella/               # Project root

## 2. package.json

[... unchanged ...]

---

## 3. visual-guide-recovery.md (template)

````markdown
---
title: Recovery Visual Guide
description: Sensory cues and ritual checkpoints for withdrawal and healing
slug: /docs/protocols/visual-guide-recovery
---

# 🖼️ Recovery Visual Guide

A sensory-driven map to guide through the recovery journey. Use color, taste, and texture as anchors for each ritual step.

<div class="visual-guide">
  <div class="visual-card">
    <div class="visual-swatch" style="background-color: var(--portal-color-alcohol)"></div>
    **Hydration Ritual**
    - Tint: Pale Rose
    - Taste: Light citrus
    - Checkpoint: 250ml electrolyte every hour
  </div>
  <div class="visual-card">
    <div class="visual-swatch" style="background-color: var(--portal-color-opioids)"></div>
    **Nutrient Restore**
    - Tint: Soft Amber
    - Taste: Earthy malt
    - Checkpoint: Protein snack post-symptom
  </div>
  <div class="visual-card">
    <div class="visual-swatch" style="background-color: var(--portal-color-benzos)"></div>
    **Sleep Support**
    - Tint: Gentle Blue
    - Texture: Smooth capsule
    - Checkpoint: Melatonin 2mg or herbal tea pre-bed
  </div>
  <div class="visual-card">
    <div class="visual-swatch" style="background-color: var(--portal-color-meth)"></div>
    **Mood Stabilize**
    - Tint: Soft Green
    - Taste: Mild herbal
    - Checkpoint: Adaptogen tonic mid-day
  </div>
</div>
```│   ├── substances/
│   │   ├── alcohol.md
│   │   ├── cocaine.md
│   │   ├── meth.md
│   │   ├── benzos.md
│   │   ├── opioids.md
│   │   ├── psychedelics.md
│   │   └── ghb.md
│   ├── protocols/
│   │   ├── test-kits.md
│   │   ├── tapering.md
│   │   ├── emergency.md
│   │   └── stack-strategies.md
│   ├── fieldcraft/
│   │   ├── stealth-lab.md
│   │   ├── counter-surveillance.md
│   │   └── urban-survival.md
│   └── intel/
│       ├── glossary.md
│       ├── redflags.md
│       └── supplier-risk.md
├── sidebars.js            # Sidebar configuration
├── docusaurus.config.js   # Main Docusaurus configuration
├── package.json           # Project metadata & dependencies
├── src/
│   ├── pages/
│   │   └── index.md       # Homepage content
│   └── css/
│       └── custom.css     # Custom styles (dark theme tweaks)
├── static/
│   └── img/
│       ├── logo.png       # Navbar logo
│       └── skull.ico      # Favicon
└── README.md              # Project overview & local setup instructions
````

---

## 2. package.json

```json
{
  "name": "helenkella",
  "version": "0.9.0-blackline",
  "private": true,
  "scripts": {
    "start": "docusaurus start",
    "build": "docusaurus build",
    "serve": "docusaurus serve",
    "deploy": "docusaurus deploy"
  },
  "dependencies": {
    "@docusaurus/core": "^2.0.0",
    "@docusaurus/preset-classic": "^2.0.0",
    "prism-react-renderer": "^1.3.5"
  }
}
```

---

## 3. docusaurus.config.js

```js
// docusaurus.config.js
const { CodeIcon, HeartIcon, BeakerIcon, ShieldIcon, BookOpenIcon, ActivityIcon } = require('lucide-react');

module.exports = {
  title: 'MYS.OS // HELENKELLA',
  tagline: 'A living atlas of resilience and healing',
  url: 'https://helenkella.com',
  baseUrl: '/',
  favicon: 'img/skull.ico',
  organizationName: 'helenkella',
  projectName: 'mysos',
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig: {
    mermaid: {
      theme: 'dark',
    },
    navbar: {
      title: 'MYS.OS',
      logo: { alt: 'Helena Sigil', src: 'img/logo.png' },
      items: [
        {
          label: 'Substances',
          position: 'left',
          icon: BeakerIcon,
          items: [ /* existing nested items */ ],
        },
        {
          label: 'Protocols',
          position: 'left',
          icon: ShieldIcon,
          items: [ /* ... */ ],
        },
        {
          label: 'Fieldcraft',
          position: 'left',
          icon: ActivityIcon,
          items: [ /* ... */ ],
        },
        {
          label: 'Intel',
          position: 'left',
          icon: BookOpenIcon,
          items: [ /* ... */ ],
        },
        {
          label: 'Mental Health',
          position: 'left',
          icon: HeartIcon,
          items: [ /* ... */ ],
        },
        { to: '/ai', label: 'AI Ops', position: 'right', icon: CodeIcon },
        { href: 'https://github.com/YOUR_REPO', label: 'GitHub', position: 'right' },
      ],
    },
    prism: { theme: require('prism-react-renderer/themes/dracula') },
    colorMode: { defaultMode: 'dark', respectPrefersColorScheme: true },
  },
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      { id: 'default', path: 'docs', routeBasePath: 'docs' }
    ]
  ],
  presets: [ 
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
```

---

## 4. sidebars.js

````js
// sidebars.js
module.exports = {
  mysSidebar: [
    {
      type: 'category',
      label: 'Substances',
      collapsed: false,
      items: [
        // Depressants
        {
          type: 'category',
          label: 'Depressants',
          items: [
            'substances/alcohol',
            'substances/benzos',
            'substances/opioids',
            'substances/ghb'
          ]
        },
        // Stimulants
        {
          type: 'category',
          label: 'Stimulants',
          items: [
            'substances/cocaine',
            'substances/meth'
          ]
        },
        // Psychedelics & Dissociatives
        {
          type: 'category',
          label: 'Psychedelics & Dissociatives',
          items: [
            'substances/psychedelics',
            'substances/lsd',
            'substances/mdma',
            'substances/ketamine',
            'substances/dxm'
          ]
        },
        // Opioid Analogs & Fentanyl
        'substances/fentanyl',
        // Research Chemicals
        'substances/rc-benzos'
      ],
    },
    {
      type: 'category',
      label: 'Protocols',
      collapsed: false,
      items: [
        'protocols/test-kits',
        'protocols/emergency',
        'protocols/tapering',
        'protocols/stack-strategies',
        'protocols/visual-guide-recovery'
      ],
    },
    {
      type: 'category',
      label: 'Fieldcraft',
      collapsed: false,
      items: [
        'fieldcraft/stealth-lab',
        'fieldcraft/counter-surveillance',
        'fieldcraft/urban-survival',
      ],
    },
    { type: 'category', label: 'Intel', collapsed: true, items: [
        'intel/glossary',
        'intel/redflags',
        'intel/supplier-risk',
      ],
    },
    {
      type: 'category',
      label: 'Mental Health',
      collapsed: true,
      items: [
        'mental-health/anxiety',
        'mental-health/depression',
        'mental-health/coping-strategies',
        'mental-health/peer-support',
      ],
    },
  ],
};
```js
// sidebars.js
module.exports = {
  mysSidebar: [
    {
      type: 'category',
      label: 'Substances',
      collapsed: false,
      items: [
        'substances/alcohol',
        'substances/cocaine',
        'substances/meth',
        'substances/benzos',
        'substances/opioids',
        'substances/psychedelics',
        'substances/ghb',
        'substances/rc-benzos',
      ],
    },
    {
      type: 'category',
      label: 'Protocols',
      collapsed: false,
      items: [
        'protocols/test-kits',
        'protocols/tapering',
        'protocols/emergency',
        'protocols/stack-strategies',
      ],
    },
    {
      type: 'category',
      label: 'Fieldcraft',
      collapsed: false,
      items: [
        'fieldcraft/stealth-lab',
        'fieldcraft/counter-surveillance',
        'fieldcraft/urban-survival',
      ],
    },
    {
      type: 'category',
      label: 'Intel',
      collapsed: true,
      items: [
        'intel/glossary',
        'intel/redflags',
        'intel/supplier-risk',
      ],
    },
  ],
};
````

---

## 5. src/pages/index.md

````markdown
---
title: Welcome to MYS.OS
description: A living atlas of resilience and healing in shadowed times
slug: /
---

# 🌌 **MYS.OS** — A Resonant Compass for Survival

> “In every ember of crisis, there lies a spark of transformation.”

Welcome to **HELENKELLA.COM**, a sanctuary of whispered truths and crafted wisdom. Here, we confront chaos not with fear, but with purpose — weaving guidance that echoes through the night, guiding those who walk the edge.

---

## 🌿 Threads of Knowledge

### 🍷 **Alchemy of Intoxication**
Understand the depths of your relationship with substances:
- [Alcohol](/docs/substances/alcohol)
- [Cocaine](/docs/substances/cocaine)
- [Methamphetamine](/docs/substances/meth)
- [Benzodiazepines](/docs/substances/benzos)
- [Opioids](/docs/substances/opioids)

### 🌀 **Recovery Rituals**
Maps to navigate the storm of withdrawal and healing:
- [Emergency Response](/docs/protocols/emergency)
- [Tapering Pathways](/docs/protocols/tapering)
- [Test Kits](/docs/protocols/test-kits)
- [Rebuild Stacks](/docs/protocols/stack-strategies)

### 🏕️ **Craft of Survival**
Forge resilience in hostile landscapes — internal and external:
- [Stealth Lab](/docs/fieldcraft/stealth-lab)
- [Counter-Surveillance](/docs/fieldcraft/counter-surveillance)
- [Urban Survival](/docs/fieldcraft/urban-survival)

### 📜 **Eyes & Ears**
Wisdom drawn from the edges of risk:
- [Glossary](/docs/intel/glossary)
- [Supply Red Flags](/docs/intel/redflags)
- [Risk Cartography](/docs/intel/supplier-risk)

---

## 🌠 The Living Codex

This is not static text — it breathes with every update, every new observation. Here, knowledge is a cycle: glean, apply, reflect, evolve.

> _"We endure by learning, we learn by enduring."_  
> — HELENKELLA
```markdown
---
title: Welcome to MYS.OS
description: A living atlas of resilience and healing in shadowed times
slug: /
---

# 🌌 **MYS.OS** — A Resonant Compass for Survival

> “In every ember of crisis, there lies a spark of transformation.”

Welcome to **HELENKELLA.COM**, a sanctuary of whispered truths and crafted wisdom. Here, we confront chaos not with fear, but with purpose — weaving guidance that echoes through the night, guiding those who walk the edge.

---

## 🌿 Threads of Knowledge

### 🍷 **Alchemy of Intoxication**
Understand the depths of your relationship with substances:
- [GUTROT — Alcohol](/docs/substances/alcohol)
- [SNOWJACK — Cocaine](/docs/substances/cocaine)
- [STARDUST-X — Methamphetamine](/docs/substances/meth)
- [RAZORSLEEP — Benzodiazepines](/docs/substances/benzos)
- [BLOODWIRE — Opioids](/docs/substances/opioids)

### 🌀 **Recovery Rituals**
Maps to navigate the storm of withdrawal and healing:
- [Emergency Response](/docs/protocols/emergency)
- [Tapering Pathways](/docs/protocols/tapering)
- [Test & Trust](/docs/protocols/test-kits)
- [Rebuild Stacks](/docs/protocols/stack-strategies)

### 🏕️ **Craft of Survival**
Forge resilience in hostile landscapes — internal and external:
- [Hidden Sanctuaries — Stealth Lab](/docs/fieldcraft/stealth-lab)
- [Veil & Shadows — Counter-Surveillance](/docs/fieldcraft/counter-surveillance)
- [Concrete Wilderness — Urban Survival](/docs/fieldcraft/urban-survival)

### 📜 **Eyes & Ears**
Wisdom drawn from the edges of risk:
- [Glossary of Echoes](/docs/intel/glossary)
- [Supply Red Flags](/docs/intel/redflags)
- [Risk Cartography](/docs/intel/supplier-risk)

---

## 🌠 The Living Codex

This is not static text — it breathes with every update, every new observation. Here, knowledge is a cycle: glean, apply, reflect, evolve.

> _"We endure by learning, we learn by enduring."_  
> — HELENKELLA

```markdown
---
title: Welcome to MYS.OS
description: Tactical Harm Reduction & Survival Intelligence for High-Risk Environments
slug: /
---

# 🧠 **MYS.OS** — Modular Yield System for Operational Survival

> “Survival favors the adapted. Intelligence favors the precise.”

Welcome to **HELENKELLA.COM**, a black-site knowledge repository focused on **harm reduction**, **clandestine chemistry**, and **psychoactive survivability**. Everything here is written for operatives in the field—**no fluff**, **no moralizing**, just **survival intelligence**.

---

## 🧷 MISSION CATEGORIES

### 💊 **Substances**
Pharmacology, risk mitigation, ROA optimization, detox vectors:
- [Alcohol – GUTROT](/docs/substances/alcohol)
- [Cocaine – SNOWJACK](/docs/substances/cocaine)
- [Methamphetamine – STARDUST-X](/docs/substances/meth)
- [Benzodiazepines – RAZORSLEEP](/docs/substances/benzos)
- [Opioids – BLOODWIRE](/docs/substances/opioids)
- [RC Benzos – DREAMFANG](/docs/substances/rc-benzos)

### 🛠️ **Protocols**
Active countermeasures, taper plans, test kits, and field interventions:
- [Test Kits](/docs/protocols/test-kits)
- [Emergency OD Response](/docs/protocols/emergency)
- [Taper Algorithms](/docs/protocols/tapering)
- [Stack Recovery Plans](/docs/protocols/stack-strategies)

### 🥷 **Fieldcraft**
Survival ops under pressure: stealth labs, urban ops, blackout defense:
- [Stealth Lab Design](/docs/fieldcraft/stealth-lab)
- [Counter-Surveillance](/docs/fieldcraft/counter-surveillance)
- [Urban Survival Protocols](/docs/fieldcraft/urban-survival)

### 🧠 **Intel**
High-risk identifiers, forensic redflags, glossary of ops terms:
- [Glossary](/docs/intel/glossary)
- [Red Flags in Supply Chain](/docs/intel/redflags)
- [Supplier Risk Analysis](/docs/intel/supplier-risk)

---

## 🔮 AI OPS INTERFACE
Use the HOLLOWPOINT GPT embedded module for real-time intelligence, stack troubleshooting, and emergency triage. [Launch AI](/ai)

---

## 🛸 MYS.OS OBJECTIVE

Build a tactical foundation of biochemical survivability for high-friction environments. Protect the brain. Protect the signal. Survive the damage.

**Version**: 0.9 BLACKLINE  
**Codename**: HELENKELLA // MYS.OS

---

> _"Knowledge is armor. Precision is power."_  
> — BLACKFORGE
````

---

## 6. src/css/custom.css

````css
/* src/css/custom.css */
:root {
  --ifm-color-primary-dark: #1f1f1f;
  --ifm-color-primary: #000000;
  --ifm-color-primary-light: #2c2c2c;
  /* Visual Guide Colors */
  --portal-color-alcohol: #fbe9e7;
  --portal-color-cocaine: #ffffff;
  --portal-color-meth: #e8f5e9;
  --portal-color-benzos: #e3f2fd;
  --portal-color-opioids: #efebe9;
}

/* Terminal-style code blocks */
.codeBlock pre {
  background-color: #111111;
  border-radius: 4px;
  padding: 16px;
}

/* Visual Guide Cards */
.visual-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 2rem;
}

.visual-card {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.visual-swatch {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: 0 auto 12px;
  border: 2px solid #444;
}
```css
/* src/css/custom.css */
:root {
  --ifm-color-primary-dark: #1f1f1f;
  --ifm-color-primary: #000000;
  --ifm-color-primary-light: #2c2c2c;
}

/* Terminal-style code blocks */
.codeBlock pre {
  background-color: #111111;
  border-radius: 4px;
  padding: 16px;
}

````

