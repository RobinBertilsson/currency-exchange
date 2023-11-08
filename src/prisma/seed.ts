import { createDateInterval, createUtcDate, format } from '../utils/date'
import { Currency } from '../sdk/shared/Currency'
import { SDK } from '../sdk/openexchangerates'
import { prisma } from './client'

async function main() {
  const start = createUtcDate(2023, 10, 1)
  const end = createUtcDate(2023, 10, 31)

  const days = createDateInterval(start, end)

  for (const day of days) {
    const date = format(day)
    const iso = day.toISOString()

    const response = await SDK.Historical.getHistorical({
      appId: process.env.APP_INTEGRATION_OPENEXCHANGERATES_APP_ID as string,
      symbols: process.env.APP_CURRENCIES?.split(',') as Currency[],
      base: process.env.APP_BASE_CURRENCY as Currency,
      date: date,
    })

    for (const entry of Object.entries(response.rates)) {
      const [currency, rate]: [string, number] = entry

      await prisma.currencyRateHistories.create({
        data: {
          date: iso,
          currency,
          rate,
        },
      })
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
