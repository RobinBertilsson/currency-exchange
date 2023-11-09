import { ChangeEvent } from 'react'

interface Props {
  onCurrencyChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  onAmountChange?: (event: ChangeEvent<HTMLInputElement>) => void
  currencyValue: string
  currencies: string[]
  amountValue: string
  isLoading?: boolean
}

export function CurrencyInput(props: Props) {
  const { onAmountChange, amountValue, onCurrencyChange, currencyValue, currencies, isLoading = false } = props

  return (
    <div className="flex focus-within:ring-2 ring-black rounded bg-white border border-gray-300">
      {isLoading ? (
        <div className="w-full flex items-center justify-start px-3">
          <div className="w-44 h-4 bg-gray-200 animate-pulse" />
        </div>
      ) : (
        <input
          className="border-0 bg-transparent focus:outline-none focus:ring-0 w-full"
          onChange={onAmountChange}
          value={amountValue}
          type="number"
        />
      )}

      <select
        className="border-0 bg-transparent focus:outline-none focus:ring-0 w-24"
        defaultValue={currencyValue}
        onChange={onCurrencyChange}
      >
        {currencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  )
}
