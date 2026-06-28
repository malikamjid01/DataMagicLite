import { useState, useCallback } from 'react'
import { datasetsApi } from '../api/datasets'
import type { Dataset, DatasetPreview } from '../types'

export function useDataset() {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [preview, setPreview] = useState<DatasetPreview | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const fetchDatasets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await datasetsApi.list()
      setDatasets(data)
    } catch (e: any) {
      setError(e?.response?.data?.detail || 'Failed to load datasets')
    } finally {
      setLoading(false)
    }
  }, [])

  const upload = useCallback(async (file: File) => {
    setLoading(true)
    setError(null)
    setUploadProgress(0)
    try {
      const dataset = await datasetsApi.upload(file, setUploadProgress)
      setDatasets(prev => [dataset, ...prev])
      return dataset
    } catch (e: any) {
      setError(e?.response?.data?.detail || 'Upload failed')
      throw e
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }, [])

  const fetchPreview = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const data = await datasetsApi.preview(id)
      setPreview(data)
    } catch (e: any) {
      setError(e?.response?.data?.detail || 'Failed to load preview')
    } finally {
      setLoading(false)
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    await datasetsApi.delete(id)
    setDatasets(prev => prev.filter(d => d.id !== id))
  }, [])

  return { datasets, preview, loading, error, uploadProgress, fetchDatasets, upload, fetchPreview, remove }
}
