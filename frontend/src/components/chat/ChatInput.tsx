import { useState, type KeyboardEvent } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps { onSend: (msg: string) => void; disabled?: boolean }

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')

  const send = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="px-4 py-3 border-t border-gray-100 flex items-end gap-2">
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKey}
        disabled={disabled}
        rows={1}
        placeholder="Ask a question…"
        className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50"
      />
      <button
        onClick={send}
        disabled={disabled || !value.trim()}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
      >
        <Send size={16} />
      </button>
    </div>
  )
}
