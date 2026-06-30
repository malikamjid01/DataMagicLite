import { useTheme } from '../../context/ThemeContext';

interface DataTableProps {
  data: Record<string, unknown>[];
  columnTypes: Record<string, string>;
}

const typeColors: Record<string, string> = {
  numeric: 'text-blue-400',
  categorical: 'text-purple-400',
  datetime: 'text-emerald-400',
  text: 'text-gray-400',
};

const DataTable = ({ data, columnTypes }: DataTableProps) => {
  const { isDark } = useTheme();

  if (data.length === 0) {
    return (
      <div className={`text-center py-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        Koi data nahi mila
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className={`overflow-x-auto rounded-xl border ${
      isDark ? 'border-white/10' : 'border-gray-200'
    }`}>
      <table className="min-w-full text-sm">
        <thead className={isDark ? 'bg-white/5' : 'bg-gray-50'}>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className={`px-4 py-3 text-left font-semibold whitespace-nowrap ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span>{col}</span>
                  {columnTypes[col] && (
                    <span className={`text-[10px] font-normal ${typeColors[columnTypes[col]] || 'text-gray-500'}`}>
                      {columnTypes[col]}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t ${
                isDark
                  ? 'border-white/5 hover:bg-white/5'
                  : 'border-gray-100 hover:bg-gray-50'
              } transition-colors`}
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className={`px-4 py-2.5 whitespace-nowrap ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {String(row[col] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;