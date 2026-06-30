export interface Message {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  message: string;
  created_at: string;
}

export interface ChatSession {
  dataset_id: string;
  session_id: string;
  messages: Message[];
  count: number;
}

export interface ChatResponse {
  session_id: string;
  message: string;
  created_at: string;
}