# Script to manage environment variables and secrets safely

# Read environment variables from a secure storage (e.g., Azure Key Vault, AWS Secrets Manager, etc.)
# Assign them to respective apps for both local development and production.

# Example using Azure CLI and Key Vault

# Usage: .\manage_secrets.ps1

param(
    [string]$KeyVaultName = "your-keyvault-name",
    [string]$Environment = "development"
)

# Function to get secret from Azure Key Vault
function Get-AzureSecret {
    param(
        [string]$SecretName,
        [string]$VaultName
    )
    
    try {
        $secret = az keyvault secret show --vault-name $VaultName --name $SecretName --query "value" -o tsv
        return $secret
    } catch {
        Write-Warning "Failed to retrieve secret: $SecretName"
        return $null
    }
}

# Function to get secret from AWS Secrets Manager
function Get-AWSSecret {
    param(
        [string]$SecretId,
        [string]$Region = "us-east-1"
    )
    
    try {
        $secret = aws secretsmanager get-secret-value --region $Region --secret-id $SecretId --query "SecretString" --output text | ConvertFrom-Json
        return $secret
    } catch {
        Write-Warning "Failed to retrieve secret: $SecretId"
        return $null
    }
}

# Example: Fetch secrets for the dashboard app
Write-Host "Fetching secrets for environment: $Environment"

# Using Azure Key Vault
$DATABASE_URL = Get-AzureSecret -SecretName "database-url-$Environment" -VaultName $KeyVaultName
$REDIS_URL = Get-AzureSecret -SecretName "redis-url-$Environment" -VaultName $KeyVaultName
$INTERNAL_API_KEY = Get-AzureSecret -SecretName "internal-api-key-$Environment" -VaultName $KeyVaultName

# Set environment variables
if ($DATABASE_URL) {
    $env:DATABASE_URL = $DATABASE_URL
    Write-Host "Set DATABASE_URL"
}

if ($REDIS_URL) {
    $env:REDIS_URL = $REDIS_URL
    Write-Host "Set REDIS_URL"
}

if ($INTERNAL_API_KEY) {
    $env:INTERNAL_API_KEY = $INTERNAL_API_KEY
    Write-Host "Set INTERNAL_API_KEY"
}

# Example: Using AWS Secrets Manager
# $dashboardSecret = Get-AWSSecret -SecretId "dashboard/secrets"
# if ($dashboardSecret) {
#     $env:DATABASE_URL = $dashboardSecret.DATABASE_URL
#     $env:REDIS_URL = $dashboardSecret.REDIS_URL
# }

Write-Host @"
Secrets Management Script
=========================
1. Ensure Azure CLI or AWS CLI is installed and configured with proper permissions.
2. Update the script with your own secret identifiers and key vault names.
3. Run '.\manage_secrets.ps1' to load secrets into the local environment.
4. Use '-Environment production' for production secrets.

For Azure Key Vault:
- Make sure you're logged in: az login
- Set the correct subscription: az account set --subscription <subscription-id>

For AWS Secrets Manager:
- Configure AWS CLI: aws configure
- Ensure proper IAM permissions for accessing secrets

"@
