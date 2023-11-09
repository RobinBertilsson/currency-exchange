import { useMemo } from 'react'

export interface Props {
  date: string
  rate: number
}

export function HistoryTableRow({ date, rate }: Props) {
  const formattedDate = useMemo(() => {
    return new Date(date).toLocaleDateString()
  }, [date])

  return (
    <tr>
      <td className="text-left">{formattedDate}</td>
      <td className="text-left">{rate}</td>
    </tr>
  )
}
