#!/bin/bash

# Check if an environment argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <env>"
  echo "  env: dev | prod"
  exit 1
fi

ENV=$1

# Determine which .env file to use
if [ "$ENV" == "dev" ]; then
  ENV_FILE=".env" # Standard .env for development
  echo "Deploying to DEVELOPMENT environment using $ENV_FILE..."
elif [ "$ENV" == "prod" ]; then
  ENV_FILE=".env.production"
  echo "Deploying to PRODUCTION environment using $ENV_FILE..."
else
  echo "Error: Invalid environment. Use 'dev' or 'prod'."
  exit 1
fi

# Check if the environment file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE not found."
    exit 1
fi

# Load environment variables from the file
# Using set -a to export all variables
set -a
source "$ENV_FILE"
set +a

# Verify DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL is not set in $ENV_FILE."
  exit 1
fi

echo "Running Prisma migrations..."
npx prisma migrate deploy

if [ $? -eq 0 ]; then
  echo "Generating Prisma Client..."
  npx prisma generate
  echo "✅ Database deployment successful!"
else
  echo "❌ Database deployment failed."
  exit 1
fi
