import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mb-1">
          <Sparkles size={12} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-white/10 border border-white/10 text-gray-200 rounded-bl-none'
        }`}
      >
        <p>{message.message}</p>
        <p className={`text-xs mt-1.5 ${isUser ? 'text-indigo-300' : 'text-gray-500'}`}>
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center shrink-0 mb-1 text-xs font-bold text-white">
          U
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;