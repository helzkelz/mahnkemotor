# Environment Variables Catalog

This document catalogs all environment variables used across the HelenKella Godmode OS monorepo.

## Apps Overview

### 1. dashboard (Port 3004)
**Purpose**: Main dashboard application
**Environment Variables**:
- `NEXT_PUBLIC_BASE_URL`: Base URL for the dashboard
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `DATABASE_URL`: PostgreSQL database connection string
- `REDIS_URL`: Redis connection string for session management
- `AI_PROVIDER`: AI provider (ollama, openai, etc.)
- `OLLAMA_HOST`: Ollama service host URL
- `OLLAMA_MODEL`: Ollama model name
- `OPENAI_API_KEY`: OpenAI API key (optional)
- `GEMINI_API_KEY`: Google Gemini API key (optional)
- `MISTRAL_API_KEY`: Mistral API key (optional)
- `INTERNAL_API_KEY`: Internal API key for inter-service communication
- `LOG_LEVEL`: Logging level (info, debug, error)
- `NODE_ENV`: Node environment (development, production)

### 2. helenkella-web (Port 3000)
**Purpose**: Main website for helenkella.com
**Environment Variables**:
- `NEXT_PUBLIC_DOMAIN`: Domain name
- `NEXT_PUBLIC_BASE_URL`: Base URL for the website
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `NEXT_PUBLIC_MYSCONDUCT_DOMAIN`: Mysconduct domain reference
- `NEXT_PUBLIC_MYSMANAGED_DOMAIN`: Mysmanaged domain reference
- `NEXT_PUBLIC_THESATIRIUM_DOMAIN`: Thesatirium domain reference
- `INTERNAL_API_KEY`: Internal API key for inter-service communication
- `NODE_ENV`: Node environment

### 3. mysconduct-web (Port 3001)
**Purpose**: Mysconduct branch website
**Environment Variables**:
- `NEXT_PUBLIC_DOMAIN`: Domain name
- `NEXT_PUBLIC_BASE_URL`: Base URL for the website
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `DATABASE_URL`: PostgreSQL database connection string
- `REDIS_URL`: Redis connection string
- `AI_PROVIDER`: AI provider configuration
- `OLLAMA_HOST`: Ollama service host URL
- `OLLAMA_MODEL`: Ollama model name
- `INTERNAL_API_KEY`: Internal API key for inter-service communication
- `NODE_ENV`: Node environment

### 4. mysmanaged-web (Port 3002)
**Purpose**: Mysmanaged branch website with payment capabilities
**Environment Variables**:
- `NEXT_PUBLIC_DOMAIN`: Domain name
- `NEXT_PUBLIC_BASE_URL`: Base URL for the website
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `DATABASE_URL`: PostgreSQL database connection string
- `REDIS_URL`: Redis connection string
- `STRIPE_SECRET_KEY`: Stripe payment processing secret key
- `INTERNAL_API_KEY`: Internal API key for inter-service communication
- `NODE_ENV`: Node environment

### 5. thesatirium-web (Port 3003)
**Purpose**: Thesatirium branch website with content generation
**Environment Variables**:
- `NEXT_PUBLIC_DOMAIN`: Domain name
- `NEXT_PUBLIC_BASE_URL`: Base URL for the website
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `DATABASE_URL`: PostgreSQL database connection string
- `REDIS_URL`: Redis connection string
- `AI_PROVIDER`: AI provider for content generation
- `OLLAMA_HOST`: Ollama service host URL
- `OLLAMA_MODEL`: Ollama model name
- `INTERNAL_API_KEY`: Internal API key for inter-service communication
- `NODE_ENV`: Node environment

### 6. lorefront-web (Port 3005)
**Purpose**: Lorefront website
**Environment Variables**:
- `NEXT_PUBLIC_DOMAIN`: Domain name
- `NEXT_PUBLIC_BASE_URL`: Base URL for the website
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `INTERNAL_API_KEY`: Internal API key for inter-service communication
- `NODE_ENV`: Node environment

### 7. satirium-web (Port 3006)
**Purpose**: Satirium website
**Environment Variables**:
- `NEXT_PUBLIC_DOMAIN`: Domain name
- `NEXT_PUBLIC_BASE_URL`: Base URL for the website
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `INTERNAL_API_KEY`: Internal API key for inter-service communication
- `NODE_ENV`: Node environment

### 8. cli
**Purpose**: Command-line interface for mission management
**Environment Variables**: None currently defined

## Shared Environment Variables

### Common to All Web Apps
- `NEXT_PUBLIC_BASE_URL`: Base URL for each app
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `INTERNAL_API_KEY`: Shared internal API key for inter-service communication
- `NODE_ENV`: Node environment

### Database & Infrastructure (where applicable)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string for session management and caching

### AI Services (where applicable)
- `AI_PROVIDER`: AI provider configuration (ollama, openai, etc.)
- `OLLAMA_HOST`: Ollama service host URL
- `OLLAMA_MODEL`: Ollama model name

### External Services
- `OPENAI_API_KEY`: OpenAI API key
- `GEMINI_API_KEY`: Google Gemini API key
- `MISTRAL_API_KEY`: Mistral API key
- `STRIPE_SECRET_KEY`: Stripe payment processing key

## Security Notes

1. **Never commit secrets**: All `.env*` files are excluded from version control
2. **Use different keys**: Production and development should use different API keys
3. **Environment isolation**: Each environment (dev, prod) has separate configuration
4. **Principle of least privilege**: Only include environment variables that each app actually needs

## File Structure

```
apps/
├── dashboard/
│   ├── .env.local        # Development environment
│   └── .env.production   # Production environment template
├── helenkella-web/
│   ├── .env.local        # Development environment
│   └── .env.production   # Production environment template
├── mysconduct-web/
│   ├── .env.local        # Development environment
│   └── .env.production   # Production environment template
├── mysmanaged-web/
│   ├── .env.local        # Development environment
│   └── .env.production   # Production environment template
├── thesatirium-web/
│   ├── .env.local        # Development environment
│   └── .env.production   # Production environment template
├── lorefront-web/
│   ├── .env.local        # Development environment
│   └── .env.production   # Production environment template
└── satirium-web/
    ├── .env.local        # Development environment
    └── .env.production   # Production environment template
```

## Vercel Deployment

For Vercel deployments, environment variables should be configured in the Vercel project settings:

1. Navigate to your Vercel project dashboard
2. Go to Settings > Environment Variables
3. Add each required environment variable for the specific app
4. Set appropriate values for Preview and Production environments

This approach ensures secrets are managed securely and separately from your codebase.
