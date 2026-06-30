import { ChartData } from '../types';

// Chart data ko CSV mein export karo
export const exportToCSV = (chart: ChartData): void => {
  if (!chart.data || chart.data.length === 0) return;

  const headers = Object.keys(chart.data[0]).join(',');
  const rows = chart.data.map((row) =>
    Object.values(row)
      .map((val) => `"${val}"`)
      .join(',')
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

// Chart data ko JSON mein export karo
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

// Chart ko image mein export karo
export const exportChartAsImage = (elementId: string, fileName: string): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  import('html2canvas').then((html2canvas) => {
    html2canvas.default(element).then((canvas) => {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.png`;
      link.click();
    });
  });
};