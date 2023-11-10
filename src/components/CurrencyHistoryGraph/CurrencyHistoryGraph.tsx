import { useHistories } from '~/hooks/useHistories'
import { LineGraph } from '../LineGraph/LineGraph'
import { useState } from 'react'
import { format } from '~/utils/date'
import { Panel } from '../Panel/Panel'

interface Props {
  currency: string
}

/**
 * @todo move into histories API
 */
// type Range = 'L10D' | 'MONTH' | 'YEAR'

export function CurrencyHistoryGraph(props: Props) {
  const { data, isLoading } = useHistories(props.currency)
  // const [range, setRange] = useState<Range>('L10D')

  if (isLoading || !data?.histories) {
    return <>loading...</>
  }

  return (
    <div>
      {/* <select onChange={e => setRange(e.target.value as Range)}>
        <option value="L10D">Last 10 days</option>
        <option value="MONTH">Month</option>
        <option value="YEAR">Year</option>
      </select> */}

      <Panel>
        <div className="h-80">
          <LineGraph data={data.histories.map(({ date, rate }) => ({ label: format(new Date(date)), value: rate }))} />
        </div>
      </Panel>
    </div>
  )
}
