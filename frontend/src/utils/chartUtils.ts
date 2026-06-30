export const generateColors = (count: number): string[] => {
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
  ];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};