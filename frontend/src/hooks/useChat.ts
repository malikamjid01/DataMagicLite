import { useState } from 'react';
import type { Message } from '../types';
import { sendMessage, getChatHistory } from '../api/chat';

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async (datasetId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getChatHistory(datasetId);
      setMessages(data.messages || []);
      setSessionId(data.session_id);
    } catch (err: unknown) {
      // 404 matlab koi chat nahi — error nahi hai
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const send = async (datasetId: string, message: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // User message turant show karo
      const userMessage: Message = {
        id: Date.now().toString(),
        session_id: sessionId || '',
        role: 'user',
        message: message,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // AI response lo
      const response = await sendMessage(datasetId, message);
      setSessionId(response.session_id);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        session_id: response.session_id,
        role: 'assistant',
        message: response.message,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Message send error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sessionId,
    isLoading,
    error,
    loadHistory,
    send,
  };
};

export default useChat;