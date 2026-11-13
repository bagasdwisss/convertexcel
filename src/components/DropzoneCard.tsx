import React, { useRef, useState } from 'react';
import { UploadCloud, PlusCircle } from 'lucide-react';

interface DropzoneCardProps {
  onFilesSelected: (files: FileList | File[]) => void;
  isProcessing: boolean;
}

export const DropzoneCard: React.FC<DropzoneCardProps> = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
      // Reset input value so same files can be re-uploaded if cleared
      e.target.value = '';
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`brutal-card brutal-card-hover p-6 md:p-8 cursor-pointer relative overflow-hidden transition-all duration-150 ${
        isDragOver
          ? 'bg-brutal-yellow border-dashed scale-[1.01]'
          : 'bg-white hover:bg-[#FFFDF5]'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Decorative Corner Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <span className="brutal-pill text-[10px] bg-brutal-dark text-white">
          MULTI-FILE READY
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        {/* Upload Icon Box */}
        <div className="w-20 h-20 bg-brutal-yellow rounded-2xl border-2 border-brutal-dark shadow-brutal flex items-center justify-center shrink-0 text-brutal-dark group-hover:scale-105 transition-transform">
          {isProcessing ? (
            <div className="w-8 h-8 border-4 border-brutal-dark border-t-transparent rounded-full animate-spin" />
          ) : (
            <UploadCloud className="w-10 h-10 stroke-[2.2]" />
          )}
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-black uppercase tracking-wider bg-brutal-green text-brutal-dark border border-brutal-dark px-2.5 py-0.5 rounded-full">
              LANGKAH 1
            </span>
            <span className="text-xs font-bold text-zinc-500">
              Format didukung: .xlsx / .xls
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-brutal-dark tracking-tight">
            Tarik & Lepas File Excel Anda ke Sini
          </h3>

          <p className="text-sm font-medium text-zinc-700 max-w-xl leading-relaxed">
            Pilih satu atau sekaligus puluhan file Excel yang ingin digabungkan. Sistem akan otomatis memangkas 6 kolom yang tidak diperlukan dan menggabungkannya secara instan.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              type="button"
              className="brutal-btn bg-brutal-dark text-white hover:bg-zinc-800 text-xs py-2 px-4 flex items-center gap-2 font-bold uppercase tracking-wider"
            >
              <PlusCircle className="w-4 h-4 text-brutal-yellow" />
              <span>PILIH FILE DARI KOMPUTER</span>
            </button>
            <span className="text-xs font-semibold text-zinc-500">
              atau klik di sembarang area kotak ini
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
