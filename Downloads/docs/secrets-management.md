# Secrets Management Guide

This guide provides instructions for developers on how to securely manage environment variables and secrets in the HelenKella Godmode Stack monorepo.

## Overview

The monorepo uses a centralized approach to environment configuration with separate files for different environments:
- `.env.local` - Development environment (local development)
- `.env.production` - Production environment (templates, values set in Vercel)

## Getting Started

### 1. Local Development Setup

Each app has its own `.env.local` file for development. These files contain non-sensitive defaults and placeholders for secrets.

**Important**: Never commit actual secrets to version control. All `.env*` files are excluded from Git.

### 2. Setting Up Your Development Environment

1. **Copy the template files** (if they don't exist):
   ```bash
   # For each app, copy the template to create your local environment
   cp apps/dashboard/.env.local.example apps/dashboard/.env.local
   ```

2. **Fill in the secrets** in your `.env.local` files:
   ```bash
   # Example for dashboard app
   DATABASE_URL=postgresql://user:password@localhost:5432/godmode_dev
   REDIS_URL=redis://localhost:6379
   INTERNAL_API_KEY=your-dev-internal-api-key
   OPENAI_API_KEY=your-openai-api-key
   ```

### 3. Production Deployment

For production deployments on Vercel:

1. **Navigate to your Vercel project** dashboard
2. **Go to Settings → Environment Variables**
3. **Add each required environment variable** for your specific app
4. **Set different values** for Preview and Production environments

## Security Best Practices

### 1. Never Commit Secrets
- All `.env*` files are excluded from version control
- Use placeholders or empty values in template files
- Share secrets through secure channels (password managers, encrypted communication)

### 2. Use Different Keys for Different Environments
- Development: Use test/development API keys
- Production: Use production API keys with appropriate permissions
- Staging: Use separate staging keys when available

### 3. Principle of Least Privilege
- Only include environment variables that each app actually needs
- Review and remove unused environment variables regularly

### 4. Secret Rotation
- Rotate secrets regularly (quarterly or as needed)
- Update secrets in all environments when rotating
- Use time-limited access tokens when possible

## Environment Variables by App

### Shared Variables
Most apps share these common variables:
- `NEXT_PUBLIC_BASE_URL` - Base URL for the app
- `NEXT_PUBLIC_API_URL` - API endpoint URL
- `INTERNAL_API_KEY` - Internal API key for inter-service communication
- `NODE_ENV` - Node environment (development/production)

### Database & Infrastructure
Apps that need database access:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string

### AI Services
Apps using AI features:
- `AI_PROVIDER` - AI provider (ollama, openai, etc.)
- `OLLAMA_HOST` - Ollama service host URL
- `OLLAMA_MODEL` - Ollama model name
- `OPENAI_API_KEY` - OpenAI API key
- `GEMINI_API_KEY` - Google Gemini API key
- `MISTRAL_API_KEY` - Mistral API key

### External Services
- `STRIPE_SECRET_KEY` - Stripe payment processing (mysmanaged-web only)

## Automated Secrets Management

### Using the Management Script

A script is provided at `scripts/manage_secrets.sh` to help with secrets management:

```bash
# Make the script executable
chmod +x scripts/manage_secrets.sh

# Run the script (customize it first)
./scripts/manage_secrets.sh
```

### Integration with External Secret Managers

For production environments, consider integrating with:

1. **AWS Secrets Manager**
   ```bash
   aws secretsmanager get-secret-value --secret-id myapp/prod/database
   ```

2. **HashiCorp Vault**
   ```bash
   vault kv get secret/myapp/prod/database
   ```

3. **Azure Key Vault**
   ```bash
   az keyvault secret show --vault-name MyVault --name database-url
   ```

## Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Check file naming (`.env.local` vs `.env.development`)
   - Verify file is in the correct app directory
   - Ensure no spaces around the `=` sign

2. **Secrets not available in production**
   - Check Vercel environment variables are set
   - Verify variable names match exactly
   - Check environment (Production vs Preview)

3. **CORS or API issues**
   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Check `INTERNAL_API_KEY` matches across services

### Getting Help

1. Check the environment variables catalog: `docs/environment-variables.md`
2. Review the app-specific `.env.local` files for examples
3. Contact the development team for production secrets

## File Structure Reference

```
godmode-stack/
├── apps/
│   ├── dashboard/
│   │   ├── .env.local          # Development environment
│   │   └── .env.production     # Production template
│   ├── helenkella-web/
│   │   ├── .env.local          # Development environment
│   │   └── .env.production     # Production template
│   └── ...
├── docs/
│   ├── environment-variables.md # Complete variables catalog
│   └── secrets-management.md    # This file
└── scripts/
    └── manage_secrets.sh         # Secrets management script
```

## Security Checklist

Before deploying to production:

- [ ] All secrets are set in Vercel environment variables
- [ ] No secrets are committed to version control
- [ ] Production and development use different API keys
- [ ] Unnecessary environment variables are removed
- [ ] Internal API keys are generated and shared securely
- [ ] Database and Redis URLs point to production instances
- [ ] All team members have access to necessary secrets through secure channels
