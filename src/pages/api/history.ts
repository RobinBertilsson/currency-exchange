import type { NextApiRequest, NextApiResponse } from 'next'
import { z, ZodError, ZodIssue } from 'zod'
import { prisma } from '~/prisma/client'

interface Response {
  histories: { rate: number; date: Date }[]
}

interface ErrorResponse {
  issues: ZodIssue[]
}

const schema = z.object({
  currency: z.string().min(1),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response | ErrorResponse>) {
  try {
    /**
     * Validating API input.
     * If the given input doesn't pass the validation, a ZodError will be thrown.
     */
    const { currency } = schema.parse({
      currency: req.query.currency,
    })

    /**
     * Find all histories for the given currency.
     */
    const histories = await prisma.currencyRateHistories.findMany({
      where: {
        currency: currency,
      },
      orderBy: {
        date: 'asc',
      },
      take: 7,
    })

    return res.status(200).json({
      histories: histories.map(({ date, rate }) => ({
        rate,
        date,
      })),
    })
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(422).json({
        /**
         * @todo instead of relying on a third party contract, define your own so it doens't break your API contract upon change.
         */
        issues: e.issues,
      })
    }

    throw e
  }
}
