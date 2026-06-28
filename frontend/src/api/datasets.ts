import apiClient from './client'
import type { Dataset, DatasetPreview } from '../types'

export const datasetsApi = {
  upload: (file: File, onProgress?: (pct: number) => void) => {
    const form = new FormData()
    form.append('file', file)
    return apiClient.post<Dataset>('/api/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total))
      },
    }).then(r => r.data)
  },

  list: () =>
    apiClient.get<Dataset[]>('/api/datasets').then(r => r.data),

  preview: (id: string) =>
    apiClient.get<DatasetPreview>(`/api/datasets/${id}/preview`).then(r => r.data),

  delete: (id: string) =>
    apiClient.delete(`/api/datasets/${id}`).then(r => r.data),
}
