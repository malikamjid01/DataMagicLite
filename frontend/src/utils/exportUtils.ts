import type { ChartData } from '../types';

export const exportToCSV = (chart: ChartData): void => {
  if (!chart.data || chart.data.length === 0) return;

  const headers = Object.keys(chart.data[0]).join(',');
  const rows = chart.data.map((row) =>
    Object.values(row).map((val) => `"${val}"`).join(',')
  );

  const csvContent = [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${chart.title || 'chart'}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (chart: ChartData): void => {
  const jsonContent = JSON.stringify(chart.data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${chart.title || 'chart'}.json`;
  link.click();
  URL.revokeObjectURL(url);
};