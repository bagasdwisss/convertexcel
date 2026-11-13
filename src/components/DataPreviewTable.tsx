import React, { useState, useMemo } from 'react';
import { 
  Table, 
  Search, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface DataPreviewTableProps {
  headers: string[];
  rows: (string | number | null | undefined)[][];
  onDownload: () => void;
  onDownloadCsv: () => void;
  hasFiles: boolean;
}

export const DataPreviewTable: React.FC<DataPreviewTableProps> = ({
  headers,
  rows,
  onDownload,
  onDownloadCsv,
  hasFiles,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Filter rows based on search term
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return rows;
    const term = searchTerm.toLowerCase();
    return rows.filter((row) =>
      row.some((cell) => cell !== null && cell !== undefined && String(cell).toLowerCase().includes(term))
    );
  }, [rows, searchTerm]);

  // Reset to page 1 when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  if (!hasFiles || rows.length === 0) {
    return (
      <div className="brutal-card bg-white p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-brutal-yellow rounded-2xl border-2 border-brutal-dark shadow-brutal flex items-center justify-center mx-auto text-brutal-dark">
          <Table className="w-8 h-8 stroke-[2.2]" />
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-black text-brutal-dark uppercase tracking-tight">
            Pratinjau Data Gabungan Belum Tersedia
          </h4>
          <p className="text-xs text-zinc-500 font-medium max-w-md mx-auto">
            Unggah file Excel di atas atau klik tombol <strong>"COBA DEMO"</strong> di bilah samping kiri untuk melihat pratinjau hasil penggabungan secara instan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="brutal-card bg-white p-5 md:p-6 space-y-4">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-brutal-dark pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brutal-green border-2 border-brutal-dark shadow-brutal-sm flex items-center justify-center">
            <Eye className="w-4 h-4 text-brutal-dark" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black uppercase tracking-wider text-brutal-dark">
                PRATINJAU HASIL GABUNGAN
              </h4>
              <span className="brutal-pill text-[9px] py-0.5 px-2 bg-brutal-dark text-white">
                LIVE PREVIEW
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-semibold">
              Menampilkan {filteredRows.length.toLocaleString('id-ID')} baris data bersih
            </p>
          </div>
        </div>

        {/* Search & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Nomor Hak / NIB..."
              className="w-full pl-9 pr-3 py-1.5 bg-zinc-50 border-2 border-brutal-dark rounded-xl text-xs font-bold text-brutal-dark placeholder-zinc-400 focus:outline-none focus:bg-white shadow-[2px_2px_0px_#111111]"
            />
          </div>

          {/* Quick Download Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="brutal-btn bg-brutal-yellow hover:bg-brutal-yellowHover text-brutal-dark px-3 py-1.5 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXCEL (.XLSX)</span>
            </button>
            <button
              onClick={onDownloadCsv}
              className="brutal-btn bg-white hover:bg-zinc-100 text-brutal-dark px-2.5 py-1.5 text-xs font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              title="Download CSV"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="border-2 border-brutal-dark rounded-xl overflow-hidden shadow-[2px_2px_0px_#111111] bg-white">
        <div className="overflow-x-auto max-h-[460px]">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#111111] text-white sticky top-0 z-10">
              <tr>
                <th className="py-2.5 px-3 font-black uppercase tracking-wider text-[10px] w-12 text-center border-r border-zinc-700">
                  NO
                </th>
                {headers.map((col) => (
                  <th
                    key={col}
                    className="py-2.5 px-3 font-black uppercase tracking-wider text-[11px] whitespace-nowrap border-r border-zinc-700 last:border-r-0"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col}</span>
                      <CheckCircle2 className="w-3 h-3 text-brutal-green inline" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-medium">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length + 1}
                    className="py-8 text-center text-zinc-500 font-bold"
                  >
                    Tidak ditemukan data yang cocok dengan pencarian "{searchTerm}"
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row, rowIdx) => {
                  const globalIdx = (currentPage - 1) * pageSize + rowIdx + 1;
                  return (
                    <tr
                      key={rowIdx}
                      className="hover:bg-[#FEFCE8] transition-colors even:bg-zinc-50/70"
                    >
                      <td className="py-2 px-3 text-center font-bold text-zinc-500 border-r border-zinc-200">
                        {globalIdx}
                      </td>
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className="py-2 px-3 text-zinc-800 whitespace-nowrap border-r border-zinc-200 last:border-r-0 font-semibold"
                        >
                          {cell !== null && cell !== undefined && cell !== '' ? (
                            String(cell)
                          ) : (
                            <span className="text-zinc-300 italic">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-bold text-zinc-600">
        <div>
          Menampilkan baris{' '}
          <span className="text-brutal-dark font-black">
            {filteredRows.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
          </span>{' '}
          sampai{' '}
          <span className="text-brutal-dark font-black">
            {Math.min(currentPage * pageSize, filteredRows.length)}
          </span>{' '}
          dari{' '}
          <span className="text-brutal-dark font-black">
            {filteredRows.length.toLocaleString('id-ID')}
          </span>{' '}
          baris total
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="brutal-btn bg-white hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed p-1.5 rounded-lg border-2 border-brutal-dark shadow-brutal-sm cursor-pointer"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4 text-brutal-dark" />
          </button>

          <span className="px-3 py-1 bg-zinc-100 border border-brutal-dark rounded-lg text-xs font-black text-brutal-dark">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="brutal-btn bg-white hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed p-1.5 rounded-lg border-2 border-brutal-dark shadow-brutal-sm cursor-pointer"
            title="Halaman Selanjutnya"
          >
            <ChevronRight className="w-4 h-4 text-brutal-dark" />
          </button>
        </div>
      </div>
    </div>
  );
};
