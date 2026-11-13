import React from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Trash2, 
  FileText
} from 'lucide-react';

interface SidebarProps {
  customFileName: string;
  setCustomFileName: (name: string) => void;
  onDownload: () => void;
  onDownloadPdf: () => void;
  onClearAll: () => void;
  hasFiles: boolean;
  totalRows: number;
  totalFiles: number;
  isProcessing: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  customFileName,
  setCustomFileName,
  onDownload,
  onDownloadPdf,
  onClearAll,
  hasFiles,
  isProcessing
}) => {
  return (
    <aside className="w-full lg:w-80 xl:w-96 bg-sidebar text-white flex flex-col shrink-0 border-r-2 border-brutal-dark p-5 lg:min-h-screen justify-between z-20">
      <div className="space-y-6">
        {/* Brand / Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brutal-yellow rounded-2xl border-2 border-brutal-dark shadow-brutal flex items-center justify-center text-brutal-dark font-black text-2xl shrink-0">
            <FileSpreadsheet className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">MERGEXLSX</h1>
            <p className="text-xs text-zinc-400 font-semibold tracking-wide">
              Penggabung Excel & Pembersih Kolom
            </p>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="bg-[#1C1C1E] border-2 border-zinc-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-400 uppercase tracking-wider text-[10px]">KEAMANAN DATA</span>
            <span className="brutal-pill text-[9px] bg-brutal-green text-brutal-dark">
              100% CLIENT-SIDE
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-medium">
            Data file Excel diproses langsung secara lokal di peramban Anda tanpa dikirim ke server.
          </p>
        </div>

        {/* File Naming Section */}
        <div className="bg-[#1C1C1E] border-2 border-zinc-800 rounded-2xl p-4 space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-zinc-300">
            NAMA FILE HASIL GABUNGAN
          </label>
          <div className="relative">
            <input
              type="text"
              value={customFileName}
              onChange={(e) => setCustomFileName(e.target.value)}
              placeholder="Contoh: Gabungan_Hak_Kecamatan"
              className="w-full bg-[#111111] border-2 border-zinc-700 focus:border-brutal-yellow rounded-xl px-3 py-2.5 text-sm font-bold text-white placeholder-zinc-500 focus:outline-none transition-all shadow-[2px_2px_0px_#000000]"
            />
            <span className="absolute right-3 top-2.5 text-xs font-black text-zinc-500 select-none">
              .xlsx
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 font-medium">
            Ketik nama file yang diinginkan. Format <code className="text-brutal-yellow">.xlsx</code> akan otomatis ditambahkan.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="space-y-3">
          <button
            onClick={onDownload}
            disabled={!hasFiles || isProcessing}
            className="w-full brutal-btn bg-brutal-yellow hover:bg-brutal-yellowHover text-brutal-dark py-3.5 px-4 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>GABUNG & DOWNLOAD EXCEL</span>
          </button>

          <button
            onClick={onDownloadPdf}
            disabled={!hasFiles || isProcessing}
            className="w-full brutal-btn bg-white hover:bg-zinc-100 text-brutal-dark py-2.5 px-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <FileText className="w-4 h-4 text-red-600 stroke-[2.5]" />
            <span>DOWNLOAD SEBAGAI PDF</span>
          </button>

          {hasFiles && (
            <button
              onClick={onClearAll}
              type="button"
              className="w-full brutal-btn bg-[#262626] hover:bg-red-950 text-red-400 hover:text-red-300 py-2.5 px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border-zinc-700 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>BERSIHKAN SEMUA FILE</span>
            </button>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-6 border-t border-zinc-800">
        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-semibold">
          <span>Excel Consolidator</span>
          <span>Vercel Ready</span>
        </div>
      </div>
    </aside>
  );
};
