import { useCallback, useState } from 'react'
import { Upload, FileText } from 'lucide-react'

interface UploadZoneProps {
  onFile: (file: File) => void
  accept?: string
  disabled?: boolean
}

export function UploadZone({ onFile, accept = '.csv,.xlsx,.xls', disabled }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }, [onFile])

  return (
    <label
      className={`
        flex flex-col items-center justify-center gap-3 p-10 border-2 border-dashed rounded-2xl cursor-pointer
        transition-all duration-200
        ${dragging ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center">
        <Upload size={24} className="text-primary-500" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">Drop your file here, or <span className="text-primary-600">browse</span></p>
        <p className="text-xs text-gray-400 mt-1">Supports CSV, XLSX, XLS</p>
      </div>
      <input type="file" className="sr-only" accept={accept} disabled={disabled}
        onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f) }} />
    </label>
  )
}
