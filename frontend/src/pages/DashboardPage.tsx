import { useEffect, useState } from 'react'
import { BarChart3, Upload, Database, TrendingUp } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Card } from '../components/common/Card'
import { Loading } from '../components/common/Loading'
import { ChartCard } from '../components/charts/ChartCard'
import { dashboardApi } from '../api/dashboard'
import { datasetsApi } from '../api/datasets'
import { formatNumber, formatDate } from '../utils/formatters'
import type { DashboardStats, Chart, Dataset } from '../types'
import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'

const STAT_ICONS = [BarChart3, Database, TrendingUp, Upload]

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [charts, setCharts] = useState<Chart[]>([])
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      dashboardApi.getStats().then(setStats).catch(() => {}),
      datasetsApi.list().then(d => { setDatasets(d); if (d[0]) dashboardApi.getCharts(d[0].id).then(setCharts).catch(() => {}) }).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [])

  if (loading) return <DashboardLayout><Loading /></DashboardLayout>

  const statCards = [
    { label: 'Charts Generated', value: formatNumber(stats?.charts_generated ?? 0), icon: BarChart3 },
    { label: 'Datasets', value: formatNumber(stats?.total_datasets ?? datasets.length), icon: Database },
    { label: 'Total Rows', value: formatNumber(stats?.total_rows ?? 0), icon: TrendingUp },
    { label: 'Last Upload', value: stats?.last_upload ? formatDate(stats.last_upload) : '—', icon: Upload },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Overview of your data and insights</p>
        </div>
        <Link to="/upload"><Button>Upload Data</Button></Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-primary-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">{label}</p>
              <p className="text-lg font-bold text-gray-900 mt-0.5">{value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      {charts.length > 0 ? (
        <>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Auto-generated Charts</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {charts.map(c => <ChartCard key={c.id} chart={c} />)}
          </div>
        </>
      ) : (
        <Card className="text-center py-14">
          <Upload size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="font-semibold text-gray-700">No data yet</p>
          <p className="text-sm text-gray-400 mt-1 mb-4">Upload a CSV or Excel file to generate charts.</p>
          <Link to="/upload"><Button size="sm">Upload your first file</Button></Link>
        </Card>
      )}
    </DashboardLayout>
  )
}
