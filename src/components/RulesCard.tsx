import React from 'react';
import { CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { DISPLAY_EXCLUDED_COLUMNS, DISPLAY_KEPT_COLUMNS } from '../utils/excelMerger';

export const RulesCard: React.FC = () => {
  return (
    <div className="brutal-card bg-white p-5 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-brutal-dark pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brutal-yellow border-2 border-brutal-dark shadow-brutal-sm flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brutal-dark" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-brutal-dark">
              ATURAN TRANSFORMASI KOLOM
            </h4>
            <p className="text-xs text-zinc-500 font-semibold">
              Filter ketat sesuai spesifikasi format Kantah Pertanahan
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="brutal-badge-red text-[11px]">
            <XCircle className="w-3.5 h-3.5" /> 6 Kolom Dihapus
          </span>
          <span className="brutal-badge-yellow text-[11px] bg-brutal-green">
            <CheckCircle className="w-3.5 h-3.5" /> 7 Kolom Disimpan
          </span>
        </div>
      </div>

      {/* Grid of Kept vs Removed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Removed Columns */}
        <div className="bg-red-50/70 border-2 border-red-300 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-red-900 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-red-600" />
              KOLOM YANG DIHAPUS OTOMATIS:
            </span>
            <span className="text-[10px] font-bold bg-red-200 text-red-900 px-2 py-0.5 rounded-full">
              DIBUANG
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {DISPLAY_EXCLUDED_COLUMNS.map((col) => (
              <span
                key={col}
                className="inline-flex items-center gap-1 bg-white border border-red-400 text-red-700 rounded-lg px-2.5 py-1 text-xs font-bold shadow-[2px_2px_0px_#EF4444]"
              >
                <span className="line-through opacity-80">{col}</span>
                <span className="text-red-500 text-[10px] font-black ml-0.5">✕</span>
              </span>
            ))}
          </div>

          <p className="text-[11px] text-red-800/80 font-medium pt-1">
            *Semua kolom peta, validator, blokir, dan pemilik awal/akhir langsung dibuang agar data ringkas.
          </p>
        </div>

        {/* Kept Columns */}
        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              KOLOM HASIL AKHIR (DISIMPAN):
            </span>
            <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
              STRUKTUR RESMI
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {DISPLAY_KEPT_COLUMNS.map((col, idx) => (
              <span
                key={col}
                className="inline-flex items-center gap-1.5 bg-white border border-emerald-500 text-emerald-950 rounded-lg px-2.5 py-1 text-xs font-bold shadow-[2px_2px_0px_#10B981]"
              >
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{col}</span>
              </span>
            ))}
          </div>

          <p className="text-[11px] text-emerald-800/80 font-medium pt-1">
            *Urutan dan tipe data tetap terjaga rapi sesuai format standar kantor pertanahan.
          </p>
        </div>
      </div>
    </div>
  );
};
