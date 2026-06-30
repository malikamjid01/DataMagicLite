import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

const UploadZone = ({ onFileSelect, isLoading = false }: UploadZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <span className="text-5xl">📂</span>
        {isDragActive ? (
          <p className="text-blue-500 font-medium">File yahan drop karo!</p>
        ) : (
          <>
            <p className="text-gray-600 font-medium">
              File drag & drop karo ya click karo
            </p>
            <p className="text-gray-400 text-sm">
              Supported formats: CSV, XLS, XLSX
            </p>
          </>
        )}
        {isLoading && (
          <p className="text-blue-500 text-sm font-medium">Uploading...</p>
        )}
      </div>
    </div>
  );
};

export default UploadZone;
