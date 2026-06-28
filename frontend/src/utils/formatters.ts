export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`
  return `${(bytes / 1024 ** 3).toFixed(1)} GB`
}

export const formatNumber = (n: number): string =>
  new Intl.NumberFormat().format(n)

export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))

export const formatPercent = (value: number, total: number): string =>
  total === 0 ? '0%' : `${Math.round((value / total) * 100)}%`
