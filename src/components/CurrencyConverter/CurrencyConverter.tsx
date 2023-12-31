import { CurrencyHistoryGraph } from '~/components/CurrencyHistoryGraph/CurrencyHistoryGraph'
import { useConvert, Values as UseConvertValues } from '~/hooks/useConvert'
import { CurrencyInput } from '~/components/CurrencyInput/CurrencyInput'
import { Heading } from '~/components/Heading/Heading'

interface Props {
  initialValues: UseConvertValues
  baseCurrency: string
  currencies: string[]
}

export function CurrencyConverter(props: Props) {
  const { currencies, initialValues } = props
  const { amount, base, currency, data, isLoading, setAmount, setBase, setCurrency } = useConvert(initialValues)

  return (
    <>
      <Heading level="h1" withBorder>
        Convert {base} to {currency}
      </Heading>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-2">
        <CurrencyInput
          onAmountChange={e => setAmount(e.target.value)}
          onCurrencyChange={e => setBase(e.target.value)}
          currencies={currencies}
          currencyValue={base}
          amountValue={amount}
        />

        <CurrencyInput
          amountValue={isLoading ? '' : data?.result?.toString() ?? ''}
          onCurrencyChange={e => setCurrency(e.target.value)}
          onAmountChange={() => {}}
          currencyValue={currency}
          currencies={currencies}
          isLoading={isLoading}
        />
      </div>

      <Heading level="h2" withBorder>
        History
      </Heading>

      <CurrencyHistoryGraph currency={base} />
    </>
  )
}
