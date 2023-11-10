# Currency Exchange

This application covers two primary things
1. Converting one currency to another, exchange rates are fetched from openexchangerates.org.
2. Display exchange rate histories, also from openexchangerates.org.

## Prerequisites
* Node (LTS) or NVM
* Docker

## Getting started
```bash
# Clone the project
git clone https://github.com/RobinBertilsson/currency-exchange.git

# Create .env file
# After created, ensure to set `APP_INTEGRATION_OPENEXCHANGERATES_APP_ID`.
cp .env.example .env

# Navigate to project
cd ./currency-exchange

# Install dependencies
npm install

# Start up postgres database (docker)
docker-compose up -d

# Migrate database
nvm prisma db push

# Seed currency histories
npm run db:seed

# Run application
npm run dev
```
