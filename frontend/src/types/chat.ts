export type MessageRole = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: string
  loading?: boolean
}

export interface ChatSession {
  id: string
  dataset_id: string
  messages: Message[]
  created_at: string
}
