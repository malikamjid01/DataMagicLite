import apiClient from './client'
import type { Chart, DashboardStats } from '../types'

export const dashboardApi = {
  getStats: () =>
    apiClient.get<DashboardStats>('/api/dashboard/stats').then(r => r.data),

  getCharts: (datasetId: string) =>
    apiClient.get<Chart[]>(`/api/dashboard/${datasetId}/charts`).then(r => r.data),
}
