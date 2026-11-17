import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, CopyCheck, Info, X } from 'lucide-react';
import { DuplicateDetectionResult } from '../utils/excelMerger';

interface DuplicateAlertCardProps {
  duplicateResult: DuplicateDetectionResult;
  onDismiss?: () => void;
}

export const DuplicateAlertCard: React.FC<DuplicateAlertCardProps> = ({
  duplicateResult,
  onDismiss,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!duplicateResult.hasDuplicates) {
    return null;
  }

  const { totalDuplicateRows, duplicateGroups } = duplicateResult;

  return (
    <div className="brutal-card bg-[#FEF08A] border-2 border-brutal-dark p-4 md:p-5 shadow-brutal space-y-3 animate-in fade-in slide-in-from-top-2">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brutal-dark text-brutal-yellow flex items-center justify-center shrink-0 border-2 border-brutal-dark shadow-brutal-sm">
            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm md:text-base font-black text-brutal-dark uppercase tracking-tight">
                PERINGATAN: TERDETEKSI DATA DUPLIKAT
              </h3>
              <span className="brutal-pill text-[9px] bg-red-600 text-white">
                {duplicateGroups.length} DATA IDENTIK
              </span>
            </div>
            <p className="text-xs text-zinc-800 font-bold mt-0.5 leading-relaxed">
              Ditemukan <span className="underline decoration-2 font-black">{totalDuplicateRows} baris duplikat</span> yang memiliki kesamaan identik pada <span className="font-black">Nomor_Hak</span>, <span className="font-black">Surat_Ukur</span>, dan <span className="font-black">NIB</span>.
            </p>
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            title="Tutup pesan peringatan"
            className="w-7 h-7 rounded-lg border-2 border-brutal-dark bg-white hover:bg-zinc-100 text-brutal-dark flex items-center justify-center shrink-0 cursor-pointer shadow-brutal-sm transition-all"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Reassurance note */}
      <div className="flex items-center gap-2 bg-white/70 border border-brutal-dark rounded-xl px-3 py-1.5 text-xs text-zinc-900 font-bold">
        <Info className="w-4 h-4 text-brutal-dark shrink-0" />
        <span>
          Catatan: Data duplikat <strong>tetap dimasukkan ke dalam file gabungan</strong> dan tidak dihapus secara otomatis.
        </span>
      </div>

      {/* Expand/Collapse Trigger */}
      <div className="pt-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
          className="brutal-btn bg-white hover:bg-zinc-100 text-brutal-dark py-1.5 px-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-brutal-sm"
        >
          <CopyCheck className="w-3.5 h-3.5" />
          <span>
            {isExpanded ? 'SEMBUNYIKAN RINCIAN DUPLIKAT' : `LIHAT RINCIAN (${duplicateGroups.length} ITEM)`}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
          )}
        </button>
      </div>

      {/* Collapsible Duplicate List */}
      {isExpanded && (
        <div className="mt-2 pt-3 border-t-2 border-brutal-dark/40 space-y-2">
          <div className="max-h-60 overflow-y-auto pr-1 space-y-2">
            {duplicateGroups.map((group, idx) => (
              <div
                key={group.key + idx}
                className="bg-white border-2 border-brutal-dark rounded-xl p-3 shadow-brutal-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-brutal-dark bg-amber-200 border border-brutal-dark px-2 py-0.5 rounded text-[10px]">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-zinc-900">
                      Nomor Hak: <code className="font-black bg-zinc-100 px-1 py-0.5 rounded text-brutal-dark">{group.nomorHak}</code>
                    </span>
                    <span className="text-zinc-400">|</span>
                    <span className="font-bold text-zinc-900">
                      Surat Ukur: <code className="font-black bg-zinc-100 px-1 py-0.5 rounded text-brutal-dark">{group.suratUkur}</code>
                    </span>
                    <span className="text-zinc-400">|</span>
                    <span className="font-bold text-zinc-900">
                      NIB: <code className="font-black bg-zinc-100 px-1 py-0.5 rounded text-brutal-dark">{group.nib}</code>
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 font-semibold">
                    Ditemukan pada baris ke:{' '}
                    <span className="font-bold text-red-600">
                      {group.rowIndices.join(', ')}
                    </span>
                  </p>
                </div>

                <div className="shrink-0 self-start sm:self-center">
                  <span className="brutal-pill text-[9px] bg-red-600 text-white">
                    MUNCUL {group.count}X
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
