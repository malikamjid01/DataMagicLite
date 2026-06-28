export const exportToCSV = (rows: Record<string, unknown>[], filename = 'export.csv') => {
  if (!rows.length) return
  const keys = Object.keys(rows[0])
  const csv = [
    keys.join(','),
    ...rows.map(row =>
      keys.map(k => JSON.stringify(row[k] ?? '')).join(',')
    ),
  ].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export const exportToJSON = (data: unknown, filename = 'export.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
