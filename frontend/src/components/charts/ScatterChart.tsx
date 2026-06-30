import {
  ScatterChart as ReScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScatterChartProps {
  data: { x: number; y: number }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-xs">
        <p className="text-white">
          X: {payload[0].payload.x?.toLocaleString()}
        </p>
        <p className="text-white">
          Y: {payload[0].payload.y?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const ScatterChart = ({ data }: ScatterChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ReScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
        <XAxis
          dataKey="x"
          type="number"
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey="y"
          type="number"
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ strokeDasharray: "3 3" }}
        />
        <Scatter data={data} fill="#6366f1" />
      </ReScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChart;
