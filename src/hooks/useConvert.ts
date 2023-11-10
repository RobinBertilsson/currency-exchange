import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export interface Values {
  currency: string
  amount: number
  base: string
}

export function useConvert(values: Values) {
  const [amount, setAmount] = useState<string>(values.amount.toString())
  const [currency, setCurrency] = useState<string>(values.currency)
  const [base, setBase] = useState<string>(values.base)

  const { isLoading, data } = useQuery<{ result: number }>(['convert', amount, base, currency], () =>
    fetch(`/api/convert?base=${base}&currency=${currency}&amount=${amount}`).then(res => res.json())
  )

  const { push: redirect } = useRouter()

  useEffect(() => {
    redirect(`/?amount=${amount}&base=${base}&currency=${currency}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, base, currency])

  return {
    amount,
    currency,
    base,
    setAmount,
    setCurrency,
    setBase,
    isLoading,
    data,
  }
}
