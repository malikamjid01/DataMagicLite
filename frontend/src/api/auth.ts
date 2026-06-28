import apiClient from './client'

export interface LoginPayload { email: string; password: string }
export interface LoginResponse {
  access_token: string
  token_type: string
  user: { email: string; name: string; role: string }
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse>('/api/auth/login', payload).then(r => r.data),

  logout: () =>
    apiClient.post('/api/auth/logout').then(r => r.data),
}
