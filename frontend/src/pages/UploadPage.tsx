import { useState } from 'react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Card } from '../components/common/Card'
import { UploadZone } from '../components/upload/UploadZone'
import { FilePreview } from '../components/upload/FilePreview'
import { Button } from '../components/common/Button'
import { useDataset } from '../hooks/useDataset'
import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [done, setDone] = useState(false)
  const { upload, loading, error, uploadProgress } = useDataset()

  const handleUpload = async () => {
    if (!file) return
    await upload(file)
    setDone(true)
  }

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Upload Data</h1>
        <p className="text-sm text-gray-400 mb-6">Upload a CSV or Excel file to get started.</p>

        <Card>
          {done ? (
            <div className="flex flex-col items-center py-8 gap-3">
              <CheckCircle size={40} className="text-green-500" />
              <p className="font-semibold text-gray-800">Upload complete!</p>
              <div className="flex gap-2 mt-2">
                <Button variant="secondary" onClick={() => { setFile(null); setDone(false) }}>Upload another</Button>
                <Link to="/datasets"><Button>View datasets</Button></Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <UploadZone onFile={setFile} disabled={loading} />
              {file && (
                <>
                  <FilePreview file={file} progress={uploadProgress} onRemove={() => setFile(null)} />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button onClick={handleUpload} loading={loading} disabled={loading}>
                    {loading ? `Uploading… ${uploadProgress}%` : 'Upload file'}
                  </Button>
                </>
              )}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  )
}
