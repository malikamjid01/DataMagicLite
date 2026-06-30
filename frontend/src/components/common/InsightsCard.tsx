import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { generateInsights } from '../../api/chat';
import type { TableData } from '../../types';

interface InsightsCardProps {
  datasetId: string;
  tableData: TableData | null;
  datasetName: string;
  rows: number;
  columns: number;
}

const InsightsCard = ({
  datasetId,
  tableData,
  datasetName,
  rows,
  columns,
}: InsightsCardProps) => {
  const { isDark } = useTheme();
  const [insights, setInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [error, setError] = useState('');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setError('');
      setInsights('');

      const datasetInfo = {
        filename: datasetName,
        rows,
        columns,
        columnTypes: tableData?.column_types || {},
        sampleData: tableData?.data?.slice(0, 5) || [],
      };

      const response = await generateInsights(datasetId, datasetInfo);
      setInsights(response.message);
      setGenerated(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Insights generate karne mein error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur-sm border rounded-2xl overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20'
          : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </div>
          <div>
            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              AI Insights
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Powered by AI — click to analyze your data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
          >
            {isLoading ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={13} />
                {generated ? 'Regenerate' : 'Generate Insights'}
              </>
            )}
          </button>

          {/* Expand/Collapse */}
          {generated && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isDark
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-white'
              }`}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`px-5 pb-4 border-t ${
              isDark ? 'border-white/5' : 'border-indigo-100'
            }`}
          >
            <div className="flex items-center gap-3 py-4">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-indigo-400"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                AI is analyzing your dataset...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <div className="px-5 pb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Insights Content */}
      <AnimatePresence>
        {insights && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`px-5 pb-5 border-t ${
              isDark ? 'border-white/5' : 'border-indigo-100'
            }`}
          >
            <div className={`mt-4 text-sm leading-relaxed whitespace-pre-wrap ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {insights}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InsightsCard;