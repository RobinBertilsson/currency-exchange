import { CurrencyHistory } from '~/components/CurrencyHistory/CurrencyHistory'
import { useConvert, Values as UseConvertValues } from '~/hooks/useConvert'
import { CurrencyInput } from '~/components/CurrencyInput/CurrencyInput'
import { Heading } from '~/components/Heading/Heading'
import { useMemo } from 'react'

interface Props {
  disableChangeBaseCurrency?: boolean
  initialValues: UseConvertValues
  baseCurrency: string
  currencies: string[]
}

export function CurrencyConverter(props: Props) {
  const { currencies, initialValues, baseCurrency, disableChangeBaseCurrency = true } = props
  const { amount, base, currency, data, isLoading, setAmount, setBase, setCurrency } = useConvert(initialValues)

  const baseCurrencies = useMemo(() => {
    if (!disableChangeBaseCurrency) {
      return currencies
    }

    return currencies.filter(c => c === baseCurrency)
  }, [baseCurrency, disableChangeBaseCurrency, currencies])

  return (
    <>
      <Heading level="h1" withBorder>
        Convert {base} to {currency}
      </Heading>

      <div className="mb-8 space-y-2">
        <CurrencyInput
          onAmountChange={e => setAmount(e.target.value)}
          onCurrencyChange={e => setBase(e.target.value)}
          currencyValue={baseCurrency}
          currencies={baseCurrencies}
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

      <CurrencyHistory currency={currency} />
    </>
  )
}
