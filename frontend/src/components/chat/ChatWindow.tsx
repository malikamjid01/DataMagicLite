import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'
import { useChat } from '../../hooks/useChat'

interface ChatWindowProps { datasetId: string }

export function ChatWindow({ datasetId }: ChatWindowProps) {
  const { messages, loading, sendMessage, clearChat } = useChat(datasetId)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-800">AI Chat</p>
        <button onClick={clearChat} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.length === 0 && (
          <p className="text-xs text-gray-400 text-center mt-8">Ask anything about your dataset…</p>
        )}
        {messages.map(m => <MessageBubble key={m.id} message={m} />)}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  )
}
