import type { NextApiRequest, NextApiResponse } from 'next'
import { z, ZodError, ZodIssue } from 'zod'
import { prisma } from '~/prisma/client'

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
    /**
     * Validating API input.
     * If the given input doesn't pass the validation, a ZodError will be thrown.
     */
    const { amount, base, currency } = schema.parse({
      amount: Number(req.query.amount),
      currency: req.query.currency,
      base: req.query.base,
    })

    if (base === currency) {
      return res.status(200).json({
        result: amount,
      })
    }

    /**
     * Fetching the most recent exchange rate for the given currencies.
     */
    const record = await prisma.currencyRateHistories.findFirst({
      where: {
        baseCurrency: base,
        currency: currency,
      },
      orderBy: {
        date: 'desc',
      },
    })

    if (!record) {
      throw new Error('There is no exchange rate for the given currencies.')
    }

    if (record)
      return res.status(200).json({
        result: amount * record.rate,
      })
  } catch (e) {
    if (e instanceof ZodError) {
      /**
       * @todo instead of relying on a third party contract, define your own so it doens't break your API contract upon change.
       */
      return res.status(422).json({
        issues: e.issues,
      })
    }

    throw e
  }
}
