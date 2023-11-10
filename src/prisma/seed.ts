import { createUtcDate, format } from '../utils/date'
import { getCurrencies } from '../utils/currency'
import { SDK } from '../sdk/openexchangerates'
import { prisma } from './client'

async function main() {
  // const start = createUtcDate(2023, 10, 1)
  // const end = createUtcDate(2023, 10, 31)

  // const days = createDateInterval(start, end)

  const days = [
    createUtcDate(2015, 3, 26),
    createUtcDate(2017, 6, 13),
    createUtcDate(2019, 6, 13),
    createUtcDate(2021, 6, 13),
  ]

  for (const day of days) {
    const date = format(day)
    const iso = day.toISOString()

    const response = await SDK.Historical.getHistorical({
      appId: process.env.APP_INTEGRATION_OPENEXCHANGERATES_APP_ID as string,
      base: process.env.NEXT_PUBLIC_APP_BASE_CURRENCY as string,
      symbols: getCurrencies(),
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
