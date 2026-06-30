import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  FileSpreadsheet,
  Trash2,
  BarChart2,
  CloudUpload,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Loading from '../components/common/Loading';
import useDataset from '../hooks/useDataset';

const UploadPage = () => {
  const { datasets, isLoading, error, fetchDatasets, upload, remove } = useDataset();
  const navigate = useNavigate();

  useEffect(() => { fetchDatasets(); }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const response = await upload(acceptedFiles[0]);
      if (response?.id) navigate('/dashboard');
    }
  }, [upload, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
    disabled: isLoading,
  });

  return (
    <DashboardLayout title="Upload Dataset">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <CloudUpload size={18} className="text-indigo-400" />
            Upload New Dataset
          </h2>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-white/10 hover:border-indigo-500/50 hover:bg-white/5'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />

            {/* Animated Background */}
            {isDragActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-indigo-500/5 rounded-2xl"
              />
            )}

            <div className="flex flex-col items-center gap-4 relative z-10">
              <motion.div
                animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  isDragActive
                    ? 'bg-indigo-500/20 border border-indigo-500/40'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <Upload
                  size={28}
                  className={isDragActive ? 'text-indigo-400' : 'text-gray-400'}
                />
              </motion.div>

              {isLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400 text-sm">Uploading...</p>
                </div>
              ) : isDragActive ? (
                <div>
                  <p className="text-indigo-400 font-semibold text-lg">
                    Drop it here!
                  </p>
                  <p className="text-indigo-400/60 text-sm mt-1">
                    Release to upload
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-white font-semibold text-lg">
                    Drag & drop your file
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    or{' '}
                    <span className="text-indigo-400 underline underline-offset-2">
                      browse files
                    </span>
                  </p>
                  <p className="text-gray-600 text-xs mt-3">
                    Supported: CSV, XLS, XLSX • Max 50MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Datasets List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <FileSpreadsheet size={18} className="text-indigo-400" />
            Uploaded Datasets
            {datasets.length > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs">
                {datasets.length}
              </span>
            )}
          </h2>

          {isLoading ? (
            <Loading message="Loading datasets..." />
          ) : datasets.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                <FileSpreadsheet size={22} className="text-gray-500" />
              </div>
              <p className="text-gray-400 text-sm">No datasets uploaded yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {datasets.map((dataset, index) => (
                <motion.div
                  key={dataset.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:bg-white/8 hover:border-white/20 transition-all"
                >
                  {/* File Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <FileSpreadsheet size={18} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {dataset.filename}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">
                          {dataset.rows?.toLocaleString()} rows
                        </span>
                        <span className="text-gray-700">•</span>
                        <span className="text-xs text-gray-500">
                          {dataset.columns} columns
                        </span>
                        <span className="text-gray-700">•</span>
                        <span className="text-xs text-gray-500">
                          {new Date(dataset.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-all text-xs font-medium"
                    >
                      <BarChart2 size={13} />
                      View
                    </button>
                    <button
                      onClick={() => remove(dataset.id)}
                      disabled={isLoading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-xs font-medium disabled:opacity-50"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default UploadPage;