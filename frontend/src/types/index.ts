export * from './dataset'
export * from './chart'
export * from './chat'

export interface User {
  id: string
  email: string
  full_name?: string
  role: string
  company?: string
  avatar_url?: string
}

export interface ApiError {
  message: string
  status?: number
}
