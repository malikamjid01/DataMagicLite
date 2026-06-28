interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  emptyText?: string
}

export function Table<T extends Record<string, unknown>>({ columns, data, emptyText = 'No data' }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-100 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} className={`px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wide text-xs ${col.className ?? ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="text-center py-10 text-gray-400">{emptyText}</td></tr>
          ) : data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              {columns.map(col => (
                <td key={String(col.key)} className={`px-4 py-3 text-gray-700 ${col.className ?? ''}`}>
                  {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
