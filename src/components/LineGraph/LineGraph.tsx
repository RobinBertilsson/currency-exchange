import { ReactNode } from 'react'
import { Line, LineChart, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from 'recharts'

interface DataPoint {
  label: string
  value: number
}

interface Props {
  data: DataPoint[]
}

export function LineGraph(props: Props) {
  const { data } = props

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart margin={{ bottom: 0, left: -25, right: 20, top: 20 }} className="text-sm font-sans" data={data}>
        <XAxis dataKey="label" interval={0} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="rgb(132, 204, 22)" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
