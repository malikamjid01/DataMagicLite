export type ChartType = 'bar' | 'pie' | 'line' | 'scatter' | 'histogram';

export interface KPI {
  label: string;
  value: number;
  unit: string | null;
  change: number | null;
}

export interface ChartData {
  chart_type: ChartType;
  title: string;
  x_axis: string | null;
  y_axis: string | null;
  data: Record<string, unknown>[];
  metadata: Record<string, unknown>;
}

export interface Dashboard {
  id: string;
  dataset_id: string;
  created_at: string;
  summary: {
    total_rows: number;
    total_columns: number;
    kpis: KPI[];
    column_summaries: Record<string, unknown>;
  };
  charts: ChartData[];
}