import { HistoryTable } from '~/components/HistoryTable/HistoryTable'
import { useQuery } from 'react-query'

interface Props {
  currency: string
}

export function CurrencyHistory(props: Props) {
  const { currency } = props

  const { isLoading, data } = useQuery<{ histories: { rate: number; date: string }[] }>(['history', currency], () =>
    fetch(`/api/history?currency=${currency}`).then(res => res.json())
  )

  return <HistoryTable histories={data?.histories ?? []} isLoading={isLoading} />
}
