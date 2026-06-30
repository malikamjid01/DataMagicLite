import { ChartData, ChartDataPoint } from '../types';

// Chart ke liye random color generate karo
export const generateColors = (count: number): string[] => {
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
  ];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

// Data ko chart ke liye prepare karo
export const prepareChartData = (
  data: ChartDataPoint[],
  xKey: string,
  yKey: string
): ChartDataPoint[] => {
  return data.map((item) => ({
    [xKey]: item[xKey],
    [yKey]: Number(item[yKey]),
  }));
};

// Chart title generate karo
export const generateChartTitle = (chart: ChartData): string => {
  return chart.title || `${chart.type} Chart`;
};

// Max value nikalo
export const getMaxValue = (data: ChartDataPoint[], yKey: string): number => {
  return Math.max(...data.map((item) => Number(item[yKey]) || 0));
};

// Min value nikalo
export const getMinValue = (data: ChartDataPoint[], yKey: string): number => {
  return Math.min(...data.map((item) => Number(item[yKey]) || 0));
};

// Average nikalo
export const getAverageValue = (data: ChartDataPoint[], yKey: string): number => {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, item) => acc + (Number(item[yKey]) || 0), 0);
  return sum / data.length;
};