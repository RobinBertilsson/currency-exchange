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
    const { currency } = schema.parse({
      currency: req.query.currency,
    })

    const histories = await prisma.currencyRateHistories.findMany({
      where: {
        currency,
      },
      orderBy: {
        date: 'asc',
      },
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
         * @todo should not rely on external contract, better transforming it.
         */
        issues: e.issues,
      })
    }

    throw e
  }
}
