import apiClient from './client';

export const getDashboard = async (datasetId: string) => {
  return await apiClient(`/dashboard/${datasetId}`);
};