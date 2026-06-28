import apiClient from './client'
import type { Message } from '../types'

export const chatApi = {
  sendMessage: (datasetId: string, message: string, history: Message[]) =>
    apiClient.post<{ reply: string }>('/api/chat', {
      dataset_id: datasetId,
      message,
      history: history.map(m => ({ role: m.role, content: m.content })),
    }).then(r => r.data),
}
