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