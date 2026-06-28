export interface Dataset {
  id: string
  name: string
  filename: string
  rows: number
  columns: number
  size_bytes: number
  uploaded_at: string
  status: 'processing' | 'ready' | 'error'
}

export interface ColumnInfo {
  name: string
  dtype: string
  null_count: number
  sample_values: (string | number | null)[]
}

export interface DatasetPreview {
  columns: ColumnInfo[]
  rows: Record<string, unknown>[]
  total_rows: number
}
