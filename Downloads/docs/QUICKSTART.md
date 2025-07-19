# Getting Started (Operator Quickstart)

## Prerequisites

- **Node.js**: v18+
- **pnpm**: `npm install -g pnpm`
- **Git**: Latest version
- **Docker & Docker Compose** (recommended)
- **Redis**: Running instance (for Mission Queue)
- **PostgreSQL**: Running instance (for Database & State)
- **Ollama**: For local LLM inference (`ollama.com`, `ollama pull llama3`)
- **API Keys**: `OPENAI_API_KEY` (or `GEMINI_API_KEY`, `MISTRAL_API_KEY`) in `.env`

## 1. Clone the Repository

```bash
git clone https://github.com/helzkelz/godmode-stack.git
cd godmode-stack
```

## 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your secrets
```

## 3. Install Dependencies

```bash
pnpm install
```

## 4. Database Setup (PostgreSQL Example)

```sql
CREATE TABLE IF NOT EXISTS missions (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    mission_goal TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    context JSONB,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 5. Start the OS (Local Development)

In separate terminal windows:

```bash
# Terminal 1: Start Redis
redis-server

# Terminal 2: Start PostgreSQL
# (e.g., via Docker Compose: docker-compose up -d db)

# Terminal 3: Start the Godmode Worker (the OS brain)
pnpm worker

# Terminal 4: Start the Operator Dashboard (your UI)
pnpm --filter dashboard dev

# Terminal 5: Start the HelenKella.com Landing Page (public site)
pnpm --filter helenkella-web dev
```

Access the dashboard at `http://localhost:3000` (or `3001`, check console) and HelenKella.com at `http://localhost:3000` (or `3002`, check console).