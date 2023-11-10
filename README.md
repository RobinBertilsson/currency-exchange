# Currency Exchange

This application covers two primary things
1. Converting one currency to another, exchange rates are fetched from openexchangerates.org.
2. Display exchange rate histories, also from openexchangerates.org.

## Prerequisites
* Node (LTS) or NVM
* Docker

## Pre-read

Even thought I strongly belive in minimalistic and simple code i tried my best to create a close to "real life example" integration with this project while at the same time keep it simple and easy to follow.

Instead of persisting the data in localstorage (which would be an option, even thought it's quite bad since it's persisting the data per client) I went with a fullstack application that persists the data in a proper database (postgres).

The way the service works is via two primary API endpoints. `convert` and `history` (they're both public, meaning not protected by any authentication or such, not even proper CORS configuration, which would be prefered in a production environment).

The `convert` endpoint is basically accepting a currency to convert from, the amount and a currency to convert into, then returns the amount. It's fetching the exchange rate histories from the database, based on the parameters specified above.

The `history` endpoint returns historic exchange rate for a given currency, in this example it's used to visualize it inside a line chart.

In order to populate the database with exchange rates I've created a seed method. See `./src/prisma/seed.ts`, feel free to customize the `days` variable to fit your needs. You can run this seed via `npm run db:seed`.

Since openexchangerates.org has quite a limited free plan there's quite a few workarounds, for example you're not able to change the base currency, so when inserting currency histories into the database I'm practically reversing each currency, for example `1 USD to SEK ~= 10,92`, which also means `1 SEK to USD ~= (1 / 10,92)`.

You're also not able to use the `time-series` endpoint which would be very neat for historical data (in order to save down on API hits).

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
