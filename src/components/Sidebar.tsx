import React from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Trash2, 
  Sparkles, 
  Layers, 
  FileCheck,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  customFileName: string;
  setCustomFileName: (name: string) => void;
  onDownload: () => void;
  onDownloadCsv: () => void;
  onClearAll: () => void;
  onLoadDemo: () => void;
  hasFiles: boolean;
  totalRows: number;
  totalFiles: number;
  isProcessing: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  customFileName,
  setCustomFileName,
  onDownload,
  onDownloadCsv,
  onClearAll,
  onLoadDemo,
  hasFiles,
  totalRows,
  totalFiles,
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
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">MERGEXLSX</h1>
              <span className="brutal-pill text-[10px] bg-brutal-pink text-brutal-dark border border-brutal-dark px-2 py-0.5 font-black">
                KANTAH PRO
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-semibold tracking-wide">
              Penggabung Excel & Pembersih Kolom
            </p>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="bg-[#1C1C1E] border-2 border-zinc-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-400 uppercase tracking-wider text-[10px]">KEAMANAN PRIVASI</span>
            <span className="brutal-pill text-[9px] bg-brutal-green text-brutal-dark">
              100% CLIENT-SIDE
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-medium">
            Data file sertipikat & hak tanah diproses langsung di peramban Anda. Tidak ada data yang dikirim ke server.
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
            Ketik nama file sesuai kebutuhan Anda. Format <code className="text-brutal-yellow">.xlsx</code> akan otomatis ditambahkan.
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
            onClick={onDownloadCsv}
            disabled={!hasFiles || isProcessing}
            className="w-full brutal-btn bg-white hover:bg-zinc-100 text-brutal-dark py-2.5 px-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <FileCheck className="w-4 h-4 stroke-[2.5]" />
            <span>DOWNLOAD SEBAGAI CSV</span>
          </button>
        </div>

        {/* Quick Demo & Clear Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onLoadDemo}
            type="button"
            className="brutal-btn bg-brutal-blue hover:bg-brutal-blueHover text-brutal-dark py-2 px-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>COBA DEMO</span>
          </button>

          <button
            onClick={onClearAll}
            disabled={!hasFiles}
            type="button"
            className="brutal-btn bg-[#262626] hover:bg-red-950 text-red-400 hover:text-red-300 py-2 px-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border-zinc-700"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>RESET ALL</span>
          </button>
        </div>

        {/* Compact Column Rule Info */}
        <div className="bg-[#18181A] border-2 border-zinc-800 rounded-2xl p-3.5 text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-zinc-300 font-bold uppercase tracking-wider text-[10px]">
            <Layers className="w-3.5 h-3.5 text-brutal-yellow" />
            <span>SISTEM FILTER OTOMATIS</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400">Kolom Dihapus:</span>
              <span className="text-red-400 font-bold">6 Kolom</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400">Kolom Tersisa:</span>
              <span className="text-brutal-green font-bold">7 Kolom Utama</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info & GitHub Link */}
      <div className="pt-6 border-t border-zinc-800 space-y-3">
        <a
          href="https://github.com/bagasdwisss/convertexcel"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#18181A] hover:bg-[#222224] border-2 border-zinc-700 hover:border-zinc-500 rounded-xl py-2 px-3 flex items-center justify-between text-xs font-bold text-zinc-300 transition-colors"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span className="truncate">bagasdwisss/convertexcel</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
        </a>

        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
          <span>Kantah Medan Toolkit</span>
          <span>Vercel Ready</span>
        </div>
      </div>
    </aside>
  );
};
