export type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'scatter'

export interface ChartSeries {
  name: string
  data: number[]
  color?: string
}

export interface ChartData {
  labels: string[]
  series: ChartSeries[]
}

export interface Chart {
  id: string
  title: string
  type: ChartType
  data: ChartData
  description?: string
  x_column: string
  y_column: string
}

export interface DashboardStats {
  total_datasets: number
  total_rows: number
  charts_generated: number
  last_upload?: string
}
