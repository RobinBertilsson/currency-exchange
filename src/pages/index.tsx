import { CurrencyConverter } from '~/components/CurrencyConverter/CurrencyConverter'
import { Container } from '~/components/Container/Container'
import { getCurrencies } from '~/utils/currency'

const currencies = getCurrencies()

export default function Index() {
  return (
    <main className="py-8">
      <Container>
        <CurrencyConverter
          baseCurrency={process.env.NEXT_PUBLIC_APP_BASE_CURRENCY as string}
          initialValues={{ amount: 1, base: 'SEK', currency: 'USD' }}
          currencies={currencies}
        />
      </Container>
    </main>
  )
}
