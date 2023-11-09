import type { NextApiRequest, NextApiResponse } from 'next'
import { SDK } from '~/sdk/openexchangerates'
import { z, ZodError, ZodIssue } from 'zod'
import { prisma } from '~/prisma/client'
import { format } from '~/utils/date'

interface Response {
  result: number
}

interface ErrorResponse {
  issues: ZodIssue[]
}

const schema = z.object({
  currency: z.string().min(1),
  amount: z.number().min(1),
  base: z.string().min(1),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response | ErrorResponse>) {
  try {
    const { amount, base, currency } = schema.parse({
      amount: Number(req.query.amount),
      currency: req.query.currency,
      base: req.query.base,
    })

    const today = new Date()

    let record = await prisma.currencyRateHistories.findFirst({
      where: {
        date: today,
        currency,
      },
    })

    if (!record) {
      const response = await SDK.Historical.getHistorical({
        appId: process.env.APP_INTEGRATION_OPENEXCHANGERATES_APP_ID as string,
        symbols: [currency],
        date: format(today),
        base: base,
      })

      if (!response.rates[currency]) {
        throw new Error(`SDK.Historical.getHistorical(): There was no rate for "${currency}".`)
      }

      record = await prisma.currencyRateHistories.create({
        data: {
          rate: response.rates[currency],
          date: today.toISOString(),
          currency: currency,
        },
      })
    }

    return res.status(200).json({
      result: amount * record.rate,
    })
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(422).json({
        /**
         * @todo should not rely on external contract, better transforming it.
         */
        issues: e.issues,
      })
    }

    throw e
  }
}
