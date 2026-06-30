import apiClient from './client';

export const sendMessage = async (datasetId: string, message: string) => {
  return await apiClient('/chat', {
    method: 'POST',
    body: JSON.stringify({ dataset_id: datasetId, message }),
  });
};

export const getChatHistory = async (datasetId: string) => {
  return await apiClient(`/chat/${datasetId}`);
};

export const generateInsights = async (
  datasetId: string,
  datasetInfo: {
    filename: string;
    rows: number;
    columns: number;
    columnTypes: Record<string, string>;
    sampleData: Record<string, unknown>[];
  }
) => {
  const prompt = `You are a data analyst. Analyze this dataset and give key insights.

Dataset: ${datasetInfo.filename}
Rows: ${datasetInfo.rows}
Columns: ${datasetInfo.columns}
Column Types: ${JSON.stringify(datasetInfo.columnTypes)}
Sample Data (first 5 rows): ${JSON.stringify(datasetInfo.sampleData.slice(0, 5))}

Provide:
1. What this dataset is about
2. Key trends and patterns  
3. Top performers / worst performers
4. Data quality observations
5. 2-3 actionable recommendations

Keep response concise, use emojis, bullet points. Max 150 words.`;

  return await apiClient('/chat', {
    method: 'POST',
    body: JSON.stringify({
      dataset_id: datasetId,
      message: prompt,
    }),
  });
};