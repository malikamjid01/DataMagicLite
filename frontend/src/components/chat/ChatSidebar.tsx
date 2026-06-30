import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Sparkles,
  Trash2,
  MessageSquare,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import useChat from '../../hooks/useChat';

interface ChatSidebarProps {
  datasetId: string;
  isOpen: boolean;
  onClose: () => void;
}

const suggestions = [
  'What are the top trends?',
  'Summarize the data',
  'Which region performed best?',
  'Show average values',
  'Data ka khulasa karo',
  'Konsa product best ha?',
];

const ChatSidebar = ({ datasetId, isOpen, onClose }: ChatSidebarProps) => {
  const { isDark } = useTheme();
  const { messages, isLoading, send, loadHistory } = useChat();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && datasetId) {
      loadHistory(datasetId);
    }
  }, [isOpen, datasetId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message || isLoading) return;
    setInput('');
    await send(datasetId, message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full w-full sm:w-[400px] z-50 flex flex-col border-l shadow-2xl ${
              isDark
                ? 'bg-gray-950 border-white/10'
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-5 py-4 border-b ${
              isDark ? 'border-white/5' : 'border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    AI Assistant
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400">Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={() => window.location.reload()}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isDark
                        ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                    title="Clear chat"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/10'
                      : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    isDark
                      ? 'bg-indigo-500/10 border border-indigo-500/20'
                      : 'bg-indigo-50 border border-indigo-100'
                  }`}>
                    <MessageSquare size={24} className="text-indigo-400" />
                  </div>
                  <p className={`font-semibold mb-1 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Ask about your data!
                  </p>
                  <p className={`text-sm mb-6 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    I can analyze and answer questions about your dataset
                  </p>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isDark
                            ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-indigo-500/20 hover:border-indigo-500/30 hover:text-indigo-300'
                            : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => {
                    const isUser = message.role === 'user';
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-end gap-2 ${
                          isUser ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {!isUser && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mb-1">
                            <Sparkles size={10} className="text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            isUser
                              ? 'bg-indigo-600 text-white rounded-br-none'
                              : isDark
                              ? 'bg-white/10 border border-white/10 text-gray-200 rounded-bl-none'
                              : 'bg-gray-100 border border-gray-200 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          <p>{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            isUser ? 'text-indigo-300' : isDark ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {new Date(message.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        {isUser && (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mb-1 text-xs font-bold text-white ${
                            isDark ? 'bg-gray-700' : 'bg-gray-400'
                          }`}>
                            U
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Loading */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-end gap-2"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                        <Sparkles size={10} className="text-white" />
                      </div>
                      <div className={`px-4 py-3 rounded-2xl rounded-bl-none border ${
                        isDark
                          ? 'bg-white/10 border-white/10'
                          : 'bg-gray-100 border-gray-200'
                      }`}>
                        <div className="flex gap-1.5 items-center">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={bottomRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className={`px-4 py-3 border-t ${
              isDark ? 'border-white/5' : 'border-gray-100'
            }`}>
              <div className={`flex items-end gap-2 rounded-xl px-4 py-2 border transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 focus-within:border-indigo-500/50'
                  : 'bg-gray-50 border-gray-200 focus-within:border-indigo-300'
              }`}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your data..."
                  rows={1}
                  disabled={isLoading}
                  className={`flex-1 bg-transparent text-sm focus:outline-none resize-none py-1 disabled:opacity-50 ${
                    isDark
                      ? 'text-white placeholder-gray-500'
                      : 'text-gray-900 placeholder-gray-400'
                  }`}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || input.trim() === ''}
                  className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Send size={14} className="text-white" />
                </button>
              </div>
              <p className={`text-xs mt-1.5 text-center ${
                isDark ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Enter to send • Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatSidebar;