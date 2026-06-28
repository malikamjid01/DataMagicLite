import { FileText, X } from 'lucide-react'
import { formatBytes } from '../../utils/formatters'

interface FilePreviewProps {
  file: File
  progress?: number
  onRemove: () => void
}

export function FilePreview({ file, progress, onRemove }: FilePreviewProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
      <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
        <FileText size={18} className="text-primary-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
        <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
        {progress !== undefined && progress > 0 && (
          <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <button onClick={onRemove} className="p-1 rounded-lg hover:bg-gray-200 text-gray-400 flex-shrink-0">
        <X size={16} />
      </button>
    </div>
  )
}
