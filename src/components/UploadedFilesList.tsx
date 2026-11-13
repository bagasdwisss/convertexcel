import React from 'react';
import { Trash2, CheckCircle2 } from 'lucide-react';
import { ParsedFileResult } from '../utils/excelMerger';

interface UploadedFilesListProps {
  files: ParsedFileResult[];
  onRemoveFile: (id: string) => void;
  onClearAll: () => void;
}

export const UploadedFilesList: React.FC<UploadedFilesListProps> = ({
  files,
  onRemoveFile,
  onClearAll,
}) => {
  if (files.length === 0) {
    return null;
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="brutal-card bg-white p-5 md:p-6 space-y-4">
      <div className="flex items-center justify-between border-b-2 border-brutal-dark pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider bg-brutal-dark text-white px-2.5 py-1 rounded-full">
            {files.length} FILE
          </span>
          <h4 className="text-sm font-black uppercase tracking-wider text-brutal-dark">
            DAFTAR FILE YANG AKAN DIGABUNG
          </h4>
        </div>
        <button
          onClick={onClearAll}
          type="button"
          className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer hover:underline"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Hapus Semua</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
        {files.map((file, index) => (
          <div
            key={file.id}
            className="border-2 border-brutal-dark rounded-xl p-3 bg-zinc-50 hover:bg-[#FEFCE8] transition-colors relative group shadow-[2px_2px_0px_#111111] flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-brutal-yellow border border-brutal-dark flex items-center justify-center shrink-0 text-brutal-dark font-black text-xs">
                  #{index + 1}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-black text-brutal-dark truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-[11px] font-medium text-zinc-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onRemoveFile(file.id)}
                title="Hapus file ini"
                className="w-7 h-7 rounded-lg border border-red-300 text-red-500 hover:text-white hover:bg-red-600 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-200 flex items-center justify-between text-[11px]">
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {file.rowCount.toLocaleString('id-ID')} baris
              </span>
              <span className="brutal-pill text-[9px] py-0.5 px-2 bg-brutal-green text-brutal-dark border border-brutal-dark">
                FILTER AKTIF
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
