import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  Database,
  TrendingUp,
  Layers,
  MessageCircle,
  Table2,
  LayoutGrid,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ChartCard from "../components/charts/ChartCard";
import ChatSidebar from "../components/chat/ChatSidebar";
import Loading from "../components/common/Loading";
import DataTable from "../components/common/DataTable";
import InsightsCard from "../components/common/InsightsCard";
import { getDashboard } from "../api/dashboard";
import { getDatasetTable } from "../api/datasets";
import type { Dashboard, TableData } from "../types";
import useDataset from "../hooks/useDataset";
import { useTheme } from "../context/ThemeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const DashboardPage = () => {
  const { isDark } = useTheme();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [isChartsLoading, setIsChartsLoading] = useState(false);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>("");
  const [error, setError] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"charts" | "table">("charts");
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const { datasets, fetchDatasets } = useDataset();

  useEffect(() => {
    fetchDatasets();
  }, []);

  useEffect(() => {
    if (datasets.length > 0 && !selectedDatasetId) {
      setSelectedDatasetId(datasets[0].id);
    }
  }, [datasets]);

  useEffect(() => {
    if (selectedDatasetId) {
      loadDashboard(selectedDatasetId);
      setTableData(null);
    }
  }, [selectedDatasetId]);

  useEffect(() => {
    if (activeTab === "table" && selectedDatasetId && !tableData) {
      loadTableData(selectedDatasetId);
    }
  }, [activeTab, selectedDatasetId]);

  // Load table data when insights card needs it
  useEffect(() => {
    if (dashboard && selectedDatasetId && !tableData) {
      loadTableData(selectedDatasetId);
    }
  }, [dashboard]);

  const loadDashboard = async (datasetId: string) => {
    try {
      setIsChartsLoading(true);
      setError("");
      const data = await getDashboard(datasetId);
      setDashboard(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Dashboard load error");
    } finally {
      setIsChartsLoading(false);
    }
  };

  const loadTableData = async (datasetId: string) => {
    try {
      setIsTableLoading(true);
      const data = await getDatasetTable(datasetId);
      setTableData(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Table load error");
    } finally {
      setIsTableLoading(false);
    }
  };

  const kpiIcons = [BarChart2, TrendingUp, Database, Layers];
  const kpiColors = [
    "from-indigo-500 to-blue-600",
    "from-purple-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        {/* Dataset Selector */}
        {datasets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-4 backdrop-blur-sm border rounded-2xl px-5 py-3 ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
            }`}
          >
            <Database size={16} className="text-indigo-400 shrink-0" />
            <span
              className={`text-sm shrink-0 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Active Dataset:
            </span>
            <select
              value={selectedDatasetId}
              onChange={(e) => setSelectedDatasetId(e.target.value)}
              className={`bg-transparent text-sm font-medium focus:outline-none cursor-pointer flex-1 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {datasets.map((dataset) => (
                <option
                  key={dataset.id}
                  value={dataset.id}
                  className={isDark ? "bg-gray-900" : "bg-white"}
                >
                  {dataset.filename}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* No Dataset */}
        {datasets.length === 0 && !isChartsLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col items-center justify-center py-24 rounded-2xl border ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
              <Database size={28} className="text-indigo-400" />
            </div>
            <p
              className={`font-semibold text-lg ${isDark ? "text-white" : "text-gray-900"}`}
            >
              No Dataset Found
            </p>
            <p
              className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Upload a dataset to get started
            </p>
          </motion.div>
        )}

        {/* KPI Cards */}
        {dashboard && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dashboard.summary.kpis.map((kpi, index) => {
              const Icon = kpiIcons[index % kpiIcons.length];
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className={`backdrop-blur-sm border rounded-2xl p-5 transition-all ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
                      : "bg-white border-gray-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p
                      className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {kpi.label}
                    </p>
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${kpiColors[index % kpiColors.length]} flex items-center justify-center`}
                    >
                      <Icon size={14} className="text-white" />
                    </div>
                  </div>
                  <p
                    className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {typeof kpi.value === "number"
                      ? kpi.value.toLocaleString()
                      : kpi.value}
                    {kpi.unit && (
                      <span
                        className={`text-sm font-normal ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {kpi.unit}
                      </span>
                    )}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* AI Insights Card */}
        {dashboard && (
          <InsightsCard
            datasetId={selectedDatasetId}
            tableData={tableData}
            datasetName={
              datasets.find((d) => d.id === selectedDatasetId)?.filename || ""
            }
            rows={dashboard.summary.total_rows}
            columns={dashboard.summary.total_columns}
          />
        )}

        {/* Tabs */}
        {dashboard && (
          <div
            className={`flex items-center gap-1 p-1 rounded-xl w-fit border ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            <button
              onClick={() => setActiveTab("charts")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "charts"
                  ? "bg-indigo-600 text-white"
                  : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <LayoutGrid size={15} />
              Charts
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "table"
                  ? "bg-indigo-600 text-white"
                  : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Table2 size={15} />
              Raw Data
            </button>
          </div>
        )}

        {/* Charts Tab */}
        {activeTab === "charts" &&
          (isChartsLoading ? (
            <Loading message="Loading charts..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboard?.charts.map((chart, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                >
                  <ChartCard chart={chart} />
                </motion.div>
              ))}
            </div>
          ))}

        {/* Table Tab */}
        {activeTab === "table" && (
          <div
            className={`backdrop-blur-sm border rounded-2xl p-5 ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
            }`}
          >
            {isTableLoading ? (
              <Loading message="Loading data..." />
            ) : tableData ? (
              <>
                <p
                  className={`text-xs mb-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Showing {tableData.data.length} of{" "}
                  {tableData.rows.toLocaleString()} rows
                </p>
                <DataTable
                  data={tableData.data}
                  columnTypes={tableData.column_types}
                />
              </>
            ) : (
              <p className={isDark ? "text-gray-500" : "text-gray-400"}>
                No data available
              </p>
            )}
          </div>
        )}
      </div>

      {/* Floating Chat Button */}
      {selectedDatasetId && !isChatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white z-30 hover:scale-105 transition-transform"
        >
          <MessageCircle size={22} />
        </motion.button>
      )}

      {/* Chat Sidebar */}
      <ChatSidebar
        datasetId={selectedDatasetId}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
