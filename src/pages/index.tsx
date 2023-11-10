import { CurrencyConverter } from '~/components/CurrencyConverter/CurrencyConverter'
import { Container } from '~/components/Container/Container'
import { getCurrencies } from '~/utils/currency'
import { GetServerSideProps } from 'next'

const currencies = getCurrencies()

interface Props {
  amount: number
  currency: string
  base: string
}

export default function Index({ amount, base, currency }: Props) {
  return (
    <main className="py-8">
      <Container>
        <CurrencyConverter
          baseCurrency={process.env.NEXT_PUBLIC_APP_BASE_CURRENCY as string}
          initialValues={{ amount, base, currency }}
          currencies={currencies}
        />
      </Container>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { base, currency, amount } = context.query

  if (!base || !currency || !amount) {
    return {
      redirect: {
        destination: `/?amount=1&base=USD&currency=SEK`,
        statusCode: 307,
      },
    }
  }

  return {
    props: {
      currency: currency.toString(),
      amount: Number(amount),
      base: base.toString(),
    },
  }
}
