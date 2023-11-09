import { HistoryTable } from '~/components/HistoryTable/HistoryTable'
import { useHistories } from '~/hooks/useHistories'

interface Props {
  currency: string
}

export function CurrencyHistory(props: Props) {
  const { data, isLoading } = useHistories(props.currency)

  return <HistoryTable histories={data?.histories ?? []} isLoading={isLoading} />
}
