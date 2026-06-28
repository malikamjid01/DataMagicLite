import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { Chart } from '../../types'
import { transformForRecharts, getChartColor } from '../../utils/chartUtils'

export function LineChartComponent({ chart }: { chart: Chart }) {
  const data = transformForRecharts(chart)
  const isArea = chart.type === 'area'
  const Wrapper = isArea ? AreaChart : LineChart

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Wrapper data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="label" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend />
        {chart.data.series.map((s, i) =>
          isArea
            ? <Area key={s.name} type="monotone" dataKey={s.name} stroke={s.color ?? getChartColor(i)} fill={`${s.color ?? getChartColor(i)}33`} />
            : <Line key={s.name} type="monotone" dataKey={s.name} stroke={s.color ?? getChartColor(i)} strokeWidth={2} dot={false} />
        )}
      </Wrapper>
    </ResponsiveContainer>
  )
}
