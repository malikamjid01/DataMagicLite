export interface User {
  id: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type { Dashboard } from './chart';
export type { TableData } from './dataset';
export type { ChartData, ChartType, KPI } from './chart';
export type { Dataset, UploadResponse, ColumnInfo } from './dataset';
export type { Message, ChatSession, ChatResponse } from './chat';