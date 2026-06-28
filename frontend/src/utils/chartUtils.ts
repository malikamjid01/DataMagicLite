import type { Chart, ChartType } from '../types'

export const CHART_COLORS = [
  '#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
]

export const chartTypeLabel: Record<ChartType, string> = {
  bar: 'Bar Chart',
  line: 'Line Chart',
  pie: 'Pie Chart',
  area: 'Area Chart',
  scatter: 'Scatter Plot',
}

export const getChartColor = (index: number): string =>
  CHART_COLORS[index % CHART_COLORS.length]

export const transformForRecharts = (chart: Chart) => {
  return chart.data.labels.map((label, i) => {
    const point: Record<string, unknown> = { label }
    chart.data.series.forEach(s => { point[s.name] = s.data[i] ?? 0 })
    return point
  })
}
