import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PieChartProps {
  data: Record<string, unknown>[];
  labelKey: string;
  valueKey: string;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-xs">
        <p className="text-gray-400 mb-1">{payload[0].name}</p>
        <p className="text-white font-semibold">{payload[0].value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const PieChart = ({ data, labelKey, valueKey }: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RePieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={labelKey}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#9ca3af', fontSize: '11px' }}>{value}</span>
          )}
        />
      </RePieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;