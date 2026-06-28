import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { Chart } from '../../types'
import { CHART_COLORS } from '../../utils/chartUtils'

export function PieChartComponent({ chart }: { chart: Chart }) {
  const data = chart.data.labels.map((label, i) => ({
    name: label,
    value: chart.data.series[0]?.data[i] ?? 0,
  }))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
          {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
