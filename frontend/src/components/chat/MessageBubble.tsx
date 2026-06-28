import type { Message } from '../../types'

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
        ${isUser
          ? 'bg-primary-600 text-white rounded-br-sm'
          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
        }
      `}>
        {message.loading ? (
          <span className="flex gap-1 items-center py-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        ) : message.content}
      </div>
    </div>
  )
}
