import apiClient from './client';

export const uploadDataset = async (file: File) => {
  const { data } = await import('../lib/supabase').then(m =>
    m.supabase.auth.getSession()
  );
  const token = data.session?.access_token;

  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/datasets/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.detail || 'Upload failed');
  return body;
};

export const getDatasets = async () => {
  return await apiClient('/datasets');
};

export const getDatasetTable = async (datasetId: string) => {
  return await apiClient(`/datasets/${datasetId}/table`);
};

export const deleteDataset = async (datasetId: string) => {
  return await apiClient(`/datasets/${datasetId}`, {
    method: 'DELETE',
  });
};