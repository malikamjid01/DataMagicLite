export interface ColumnInfo {
  name: string;
  type: 'numeric' | 'categorical' | 'datetime' | 'text';
  missing_count: number;
  unique_count: number;
}

export interface Dataset {
  id: string;
  filename: string;
  rows: number;
  columns: number;
  column_info?: ColumnInfo[];
  created_at: string;
}

export interface UploadResponse {
  id: string;
  filename: string;
  rows: number;
  columns: number;
  message: string;
}

export interface TableData {
  id: string;
  filename: string;
  rows: number;
  columns: number;
  data: Record<string, unknown>[];
  column_types: Record<string, string>;
}