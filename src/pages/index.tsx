import { CurrencyConverter } from '~/components/CurrencyConverter/CurrencyConverter'
import { Container } from '~/components/Container/Container'
import { getCurrencies } from '~/utils/currency'

const currencies = getCurrencies()

export default function Index() {
  return (
    <main className="py-8">
      <Container>
        <CurrencyConverter
          disableChangeBaseCurrency={process.env.NEXT_PUBLIC_APP_ENABLE_CHANGE_BASE_CURRENCY === 'false'}
          baseCurrency={process.env.NEXT_PUBLIC_APP_BASE_CURRENCY as string}
          initialValues={{ amount: 1, base: 'USD', currency: 'SEK' }}
          currencies={currencies}
        />
      </Container>
    </main>
  )
}
