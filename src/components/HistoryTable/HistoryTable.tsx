import { HistoryTableRow, Props as HistoryTableRowProps } from './HistoryTableRow'
import { HistoryTableRowLoading } from './HistoryTableRowLoading'

interface Props {
  histories: HistoryTableRowProps[]
  isLoading?: boolean
}

export function HistoryTable({ histories, isLoading = false }: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left">Date</th>
          <th className="text-left">Rate</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <HistoryTableRowLoading />
        ) : (
          histories.map((data, index) => <HistoryTableRow key={index} {...data} />)
        )}
      </tbody>
    </table>
  )
}
