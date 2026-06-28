import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { Chart } from '../../types'
import { transformForRecharts, getChartColor } from '../../utils/chartUtils'

export function BarChartComponent({ chart }: { chart: Chart }) {
  const data = transformForRecharts(chart)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="label" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend />
        {chart.data.series.map((s, i) => (
          <Bar key={s.name} dataKey={s.name} fill={s.color ?? getChartColor(i)} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
