import { CurrencyInput } from '~/components/CurrencyInput/CurrencyInput'
import { Heading } from '~/components/Heading/Heading'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

interface FormDataObj {
  currency: string
  amount: number
  base: string
}

interface Props {
  disableChangeBaseCurrency?: boolean
  initialValues: FormDataObj
  baseCurrency: string
  currencies: string[]
}

export function CurrencyConverter(props: Props) {
  const { currencies, initialValues, baseCurrency, disableChangeBaseCurrency = true } = props

  const [amount, setAmount] = useState<string>(initialValues.amount.toString())
  const [currency, setCurrency] = useState<string>(initialValues.currency)
  const [base, setBase] = useState<string>(initialValues.base)

  const { isLoading, data } = useQuery<{ result: number }>(['convert', amount, base, currency], () =>
    fetch(`/api/convert?base=${base}&currency=${currency}&amount=${amount}`).then(res => res.json())
  )

  const baseCurrencies = useMemo(() => {
    if (!disableChangeBaseCurrency) {
      return currencies
    }

    return currencies.filter(c => c === baseCurrency)
  }, [baseCurrency, disableChangeBaseCurrency, currencies])

  return (
    <div className="space-y-2">
      <Heading level="h1" withBorder>
        Convert {base} to {currency}
      </Heading>

      <CurrencyInput
        onAmountChange={e => setAmount(e.target.value)}
        onCurrencyChange={e => setBase(e.target.value)}
        currencyValue={baseCurrency}
        currencies={baseCurrencies}
        amountValue={amount}
      />

      <CurrencyInput
        amountValue={isLoading ? '' : data?.result.toString() ?? ''}
        onCurrencyChange={e => setCurrency(e.target.value)}
        onAmountChange={() => {}}
        currencyValue={currency}
        currencies={currencies}
        isLoading={isLoading}
      />
    </div>
  )
}
