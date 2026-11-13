import React from 'react';
import { Files, TableProperties } from 'lucide-react';

interface StatsBentoProps {
  totalFiles: number;
  totalRows: number;
}

export const StatsBento: React.FC<StatsBentoProps> = ({
  totalFiles,
  totalRows,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Metric 1: Total Files */}
      <div className="brutal-card brutal-card-hover bg-brutal-green p-5 md:p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-brutal-dark">
            TOTAL FILE
          </span>
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-brutal-dark shadow-brutal-sm flex items-center justify-center">
            <Files className="w-5 h-5 text-brutal-dark stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-black text-brutal-dark tracking-tight">
            {totalFiles.toLocaleString('id-ID')}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="brutal-pill text-[10px] py-0.5 px-2.5 bg-brutal-dark text-white">
              FILE EXCEL
            </span>
            <span className="text-xs font-bold text-zinc-800">
              {totalFiles > 0 ? 'Siap digabung' : 'Belum ada file diunggah'}
            </span>
          </div>
        </div>
      </div>

      {/* Metric 2: Total Rows */}
      <div className="brutal-card brutal-card-hover bg-brutal-blue p-5 md:p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-brutal-dark">
            TOTAL BARIS DATA
          </span>
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-brutal-dark shadow-brutal-sm flex items-center justify-center">
            <TableProperties className="w-5 h-5 text-brutal-dark stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-black text-brutal-dark tracking-tight">
            {totalRows.toLocaleString('id-ID')}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="brutal-pill text-[10px] py-0.5 px-2.5 bg-brutal-dark text-white">
              BARIS BERSIH
            </span>
            <span className="text-xs font-bold text-zinc-800">
              Tanpa duplikasi header
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
