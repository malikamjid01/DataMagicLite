import type { Dataset } from '../../types';
import Button from '../common/Button';

interface FilePreviewProps {
  dataset: Dataset;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const statusColors: Record<string, string> = {
  processing: 'bg-yellow-100 text-yellow-700',
  ready: 'bg-green-100 text-green-700',
  error: 'bg-red-100 text-red-700',
};

const FilePreview = ({ dataset, onDelete, isLoading = false }: FilePreviewProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-3xl">📄</span>
        <div>
          <p className="font-medium text-gray-800">{dataset.filename}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-500">{dataset.rows} rows</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors['ready']}`}>
              ready
            </span>
          </div>
        </div>
      </div>
      <Button label="Delete" variant="danger" isLoading={isLoading} onClick={() => onDelete(dataset.id)} />
    </div>
  );
};

export default FilePreview;