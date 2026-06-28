import { useState, useCallback } from 'react'
import { chatApi } from '../api/chat'
import type { Message } from '../types'

export function useChat(datasetId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    }
    const thinkingMsg: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      loading: true,
    }

    setMessages(prev => [...prev, userMsg, thinkingMsg])
    setLoading(true)
    setError(null)

    try {
      const { reply } = await chatApi.sendMessage(datasetId, content, [...messages, userMsg])
      setMessages(prev =>
        prev.map(m => m.id === thinkingMsg.id ? { ...m, content: reply, loading: false } : m)
      )
    } catch (e: any) {
      setMessages(prev => prev.filter(m => m.id !== thinkingMsg.id))
      setError(e?.response?.data?.detail || 'Chat failed')
    } finally {
      setLoading(false)
    }
  }, [datasetId, messages])

  const clearChat = useCallback(() => setMessages([]), [])

  return { messages, loading, error, sendMessage, clearChat }
}
