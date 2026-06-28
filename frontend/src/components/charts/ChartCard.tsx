import { Card } from '../common/Card'
import type { Chart } from '../../types'
import { BarChartComponent } from './BarChart'
import { LineChartComponent } from './LineChart'
import { PieChartComponent } from './PieChart'

interface ChartCardProps { chart: Chart }

export function ChartCard({ chart }: ChartCardProps) {
  const renderChart = () => {
    switch (chart.type) {
      case 'bar':   return <BarChartComponent chart={chart} />
      case 'line':
      case 'area':  return <LineChartComponent chart={chart} />
      case 'pie':   return <PieChartComponent chart={chart} />
      default:      return <BarChartComponent chart={chart} />
    }
  }
  return (
    <Card className="flex flex-col gap-3">
      <div>
        <h3 className="font-semibold text-gray-900 text-sm">{chart.title}</h3>
        {chart.description && <p className="text-xs text-gray-400 mt-0.5">{chart.description}</p>}
      </div>
      <div className="h-56">{renderChart()}</div>
    </Card>
  )
}
