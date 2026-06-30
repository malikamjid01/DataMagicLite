import { useState } from 'react';
import type { Dataset } from '../types';
import { getDatasets, uploadDataset, deleteDataset } from '../api/datasets';

const useDataset = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDatasets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getDatasets();
      setDatasets(data.datasets || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error aya');
    } finally {
      setIsLoading(false);
    }
  };

  const upload = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await uploadDataset(file);
      await fetchDatasets();
      return response;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload error aya');
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await deleteDataset(id);
      setDatasets((prev) => prev.filter((d) => d.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Delete error aya');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    datasets,
    isLoading,
    error,
    fetchDatasets,
    upload,
    remove,
  };
};

export default useDataset;