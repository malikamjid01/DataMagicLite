import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface TableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  itemsPerPage?: number;
  showPagination?: boolean;
  selectable?: boolean;
  onSelect?: (selected: any[]) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No data available',
  itemsPerPage = 10,
  showPagination = true,
  selectable = false,
  onSelect,
}) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    const sorted = [...data];
    sorted.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = paginatedData.map((_, index) => index);
      setSelectedRows(new Set(allIds));
      onSelect?.(allIds.map(i => paginatedData[i]));
    } else {
      setSelectedRows(new Set());
      onSelect?.([]);
    }
  };

  const handleSelectRow = (index: number, row: any) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
    onSelect?.(Array.from(newSelected).map(i => paginatedData[i]));
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {selectable && (
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-sm font-semibold text-gray-700 ${alignStyles[col.align || 'left']}`}
              >
                {col.sortable ? (
                  <button
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.header}
                    <span className="text-xs">
                      {sortConfig?.key === col.key
                        ? sortConfig.direction === 'asc'
                          ? '▲'
                          : '▼'
                        : '⇅'}
                    </span>
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-4 py-8 text-center text-gray-500"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl">📭</span>
                  <p>{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            paginatedData.map((row, index) => {
              const actualIndex = (currentPage - 1) * itemsPerPage + index;
              return (
                <tr
                  key={actualIndex}
                  className={`
                    border-b border-gray-100 hover:bg-blue-50 transition-colors
                    ${onRowClick ? 'cursor-pointer' : ''}
                    ${selectedRows.has(actualIndex) ? 'bg-blue-50' : ''}
                  `}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(actualIndex)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectRow(actualIndex, row);
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td 
                      key={col.key} 
                      className={`px-4 py-3 text-sm text-gray-600 ${alignStyles[col.align || 'left']}`}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
            {sortedData.length} results
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-sm border rounded-lg ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50 disabled:hover:bg-transparent"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};