import React from 'react';
import { Files, TableProperties, Scissors, CheckCheck } from 'lucide-react';

interface StatsBentoProps {
  totalFiles: number;
  totalRows: number;
  removedColumnsCount: number;
  keptColumnsCount: number;
}

export const StatsBento: React.FC<StatsBentoProps> = ({
  totalFiles,
  totalRows,
  removedColumnsCount,
  keptColumnsCount,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Total Files */}
      <div className="brutal-card brutal-card-hover bg-brutal-green p-4 md:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-brutal-dark">
            TOTAL FILE
          </span>
          <div className="w-8 h-8 rounded-xl bg-white border-2 border-brutal-dark shadow-brutal-sm flex items-center justify-center">
            <Files className="w-4 h-4 text-brutal-dark stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-black text-brutal-dark tracking-tight">
            {totalFiles.toLocaleString('id-ID')}
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="brutal-pill text-[9px] py-0.5 px-2 bg-brutal-dark text-white">
              FILE EXCEL
            </span>
            <span className="text-[11px] font-bold text-zinc-800">
              {totalFiles > 0 ? 'Siap digabung' : 'Belum ada'}
            </span>
          </div>
        </div>
      </div>

      {/* Metric 2: Total Rows */}
      <div className="brutal-card brutal-card-hover bg-brutal-blue p-4 md:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-brutal-dark">
            TOTAL BARIS DATA
          </span>
          <div className="w-8 h-8 rounded-xl bg-white border-2 border-brutal-dark shadow-brutal-sm flex items-center justify-center">
            <TableProperties className="w-4 h-4 text-brutal-dark stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-black text-brutal-dark tracking-tight">
            {totalRows.toLocaleString('id-ID')}
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="brutal-pill text-[9px] py-0.5 px-2 bg-brutal-dark text-white">
              BARIS BERSIH
            </span>
            <span className="text-[11px] font-bold text-zinc-800">
              Tanpa duplikasi header
            </span>
          </div>
        </div>
      </div>

      {/* Metric 3: Kolom Dieliminasi */}
      <div className="brutal-card brutal-card-hover bg-brutal-pink p-4 md:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-brutal-dark">
            KOLOM DIHAPUS
          </span>
          <div className="w-8 h-8 rounded-xl bg-white border-2 border-brutal-dark shadow-brutal-sm flex items-center justify-center">
            <Scissors className="w-4 h-4 text-red-600 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-black text-red-600 tracking-tight">
            -{removedColumnsCount}
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="brutal-pill text-[9px] py-0.5 px-2 bg-red-600 text-white">
              OTOMATIS
            </span>
            <span className="text-[11px] font-bold text-zinc-800 truncate">
              Luas Peta, Validator, dll
            </span>
          </div>
        </div>
      </div>

      {/* Metric 4: Kolom Output */}
      <div className="brutal-card brutal-card-hover bg-brutal-yellow p-4 md:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-brutal-dark">
            KOLOM AKHIR
          </span>
          <div className="w-8 h-8 rounded-xl bg-white border-2 border-brutal-dark shadow-brutal-sm flex items-center justify-center">
            <CheckCheck className="w-4 h-4 text-brutal-dark stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-black text-brutal-dark tracking-tight">
            {keptColumnsCount}
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="brutal-pill text-[9px] py-0.5 px-2 bg-brutal-dark text-white">
              TERSTRUKTUR
            </span>
            <span className="text-[11px] font-bold text-zinc-800">
              Standar Kantah
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
