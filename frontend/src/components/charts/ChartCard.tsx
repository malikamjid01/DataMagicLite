import type { ChartData } from "../../types";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import ScatterChart from "./ScatterChart";
import { useTheme } from "../../context/ThemeContext";

interface ChartCardProps {
  chart: ChartData;
}

const ChartCard = ({ chart }: ChartCardProps) => {
  const { isDark } = useTheme();

  const renderChart = () => {
    switch (chart.chart_type) {
      case "bar":
        return (
          <BarChart
            data={chart.data as { category: string; value: number }[]}
            xKey="category"
            yKey="value"
          />
        );
      case "histogram":
        return (
          <BarChart
            data={chart.data as { bin: string; count: number }[]}
            xKey="bin"
            yKey="count"
          />
        );
      case "pie":
        return (
          <PieChart
            data={chart.data as { category: string; value: number }[]}
            labelKey="category"
            valueKey="value"
          />
        );
      case "line":
        return (
          <LineChart
            data={chart.data as { date: string; value: number }[]}
            xKey="date"
            yKey="value"
          />
        );
      case "scatter":
        return <ScatterChart data={chart.data as { x: number; y: number }[]} />;
      default:
        return (
          <p
            className={`text-sm text-center py-10 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Chart type support nahi karta
          </p>
        );
    }
  };

  // Chart type badge color
  const typeBadge: Record<string, string> = {
    bar: "bg-indigo-500/10 text-indigo-400",
    histogram: "bg-purple-500/10 text-purple-400",
    pie: "bg-pink-500/10 text-pink-400",
    line: "bg-emerald-500/10 text-emerald-400",
    scatter: "bg-orange-500/10 text-orange-400",
  };

  return (
    <div
      className={`backdrop-blur-sm border rounded-2xl p-5 transition-all ${
        isDark
          ? "bg-white/5 border-white/10 hover:border-white/20"
          : "bg-white border-gray-200 hover:shadow-md"
      }`}
    >
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {chart.title}
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            typeBadge[chart.chart_type] || "bg-gray-500/10 text-gray-400"
          }`}
        >
          {chart.chart_type}
        </span>
      </div>

      {/* Chart */}
      {renderChart()}

      {/* X/Y axis info */}
      {(chart.x_axis || chart.y_axis) && (
        <div
          className={`flex items-center gap-4 mt-3 pt-3 border-t text-xs ${
            isDark
              ? "border-white/5 text-gray-500"
              : "border-gray-100 text-gray-400"
          }`}
        >
          {chart.x_axis && (
            <span>
              X: <span className="font-medium">{chart.x_axis}</span>
            </span>
          )}
          {chart.y_axis && (
            <span>
              Y: <span className="font-medium">{chart.y_axis}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartCard;
