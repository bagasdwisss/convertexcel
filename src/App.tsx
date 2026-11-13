import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  AlertTriangle, 
  CheckCircle, 
  X
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DropzoneCard } from './components/DropzoneCard';
import { StatsBento } from './components/StatsBento';
import { UploadedFilesList } from './components/UploadedFilesList';
import { DataPreviewTable } from './components/DataPreviewTable';
import { 
  parseExcelFile, 
  mergeParsedFiles, 
  downloadMergedExcel, 
  downloadMergedCsv,
  ParsedFileResult
} from './utils/excelMerger';

export default function App() {
  const [parsedFiles, setParsedFiles] = useState<ParsedFileResult[]>([]);
  const [customFileName, setCustomFileName] = useState<string>('Gabungan_Hak_Tanah');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Consolidated data calculation
  const { headers, rows, totalRows } = useMemo(() => {
    return mergeParsedFiles(parsedFiles);
  }, [parsedFiles]);

  // Handle files selected from dropzone or file picker
  const handleFilesSelected = async (fileList: FileList | File[]) => {
    setIsProcessing(true);
    setErrorMessage(null);
    const newFiles: ParsedFileResult[] = [];
    const errors: string[] = [];

    const filesArray = Array.from(fileList);

    for (const file of filesArray) {
      try {
        const parsed = await parseExcelFile(file);
        newFiles.push(parsed);
      } catch (err: any) {
        console.error('Error parsing file:', file.name, err);
        errors.push(`${file.name}: ${err?.message || 'Gagal memproses file'}`);
      }
    }

    if (newFiles.length > 0) {
      setParsedFiles((prev) => [...prev, ...newFiles]);
      setSuccessToast(`Berhasil menambahkan ${newFiles.length} file.`);
      setTimeout(() => setSuccessToast(null), 4000);
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(' | '));
    }

    setIsProcessing(false);
  };

  // Remove single file
  const handleRemoveFile = (id: string) => {
    setParsedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Clear all files
  const handleClearAll = () => {
    setParsedFiles([]);
    setErrorMessage(null);
    setSuccessToast('Semua file telah dibersihkan.');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Trigger celebration confetti
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FEF08A', '#FBCFE8', '#BBF7D0', '#BAE6FD', '#111111'],
      });
    } catch (e) {
      // ignore
    }
  };

  // Download Merged Excel
  const handleDownloadExcel = () => {
    if (parsedFiles.length === 0 || rows.length === 0) {
      setErrorMessage('Tidak ada data untuk diunduh. Silakan unggah file terlebih dahulu.');
      return;
    }

    try {
      const finalName = customFileName.trim() || 'Hasil_Gabungan_Excel';
      downloadMergedExcel(headers, rows, finalName);
      fireConfetti();
      setSuccessToast(`File Excel "${finalName}.xlsx" berhasil diunduh!`);
      setTimeout(() => setSuccessToast(null), 5000);
    } catch (err: any) {
      setErrorMessage(`Gagal mengunduh Excel: ${err?.message || 'Error tidak diketahui'}`);
    }
  };

  // Download Merged CSV
  const handleDownloadCsv = () => {
    if (parsedFiles.length === 0 || rows.length === 0) {
      setErrorMessage('Tidak ada data untuk diunduh.');
      return;
    }

    try {
      const finalName = customFileName.trim() || 'Hasil_Gabungan_Excel';
      downloadMergedCsv(headers, rows, finalName);
      fireConfetti();
      setSuccessToast(`File CSV "${finalName}.csv" berhasil diunduh!`);
      setTimeout(() => setSuccessToast(null), 5000);
    } catch (err: any) {
      setErrorMessage(`Gagal mengunduh CSV: ${err?.message || 'Error tidak diketahui'}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-canvas text-brutal-dark">
      {/* Dark Sidebar (Split-Tone left) */}
      <Sidebar
        customFileName={customFileName}
        setCustomFileName={setCustomFileName}
        onDownload={handleDownloadExcel}
        onDownloadCsv={handleDownloadCsv}
        onClearAll={handleClearAll}
        hasFiles={parsedFiles.length > 0}
        totalRows={totalRows}
        totalFiles={parsedFiles.length}
        isProcessing={isProcessing}
      />

      {/* Main Canvas Area (Warm Off-White Bento Grid) */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto space-y-6 max-w-7xl mx-auto w-full">
        {/* Top Header & Breadcrumb Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-brutal-dark pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="brutal-pill text-[10px] bg-brutal-yellow text-brutal-dark border border-brutal-dark">
                NEO-BRUTALISM EDITION
              </span>
              <span className="brutal-pill text-[10px] bg-brutal-green text-brutal-dark border border-brutal-dark">
                VERCEL OPTIMIZED
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-brutal-dark">
              Penggabung File Excel Kantor Pertanahan
            </h2>
            <p className="text-xs md:text-sm text-zinc-600 font-semibold mt-0.5">
              Gabungkan berkas Excel menjadi satu dokumen bersih secara otomatis.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="brutal-card bg-white px-4 py-2 flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-zinc-500">STATUS DATA</p>
                <p className="text-xs font-black text-brutal-dark">
                  {totalRows > 0 ? `${totalRows.toLocaleString('id-ID')} BARIS SIAP` : 'STANDBY'}
                </p>
              </div>
              <div className={`w-3.5 h-3.5 rounded-full border-2 border-brutal-dark ${totalRows > 0 ? 'bg-brutal-green' : 'bg-zinc-300'} animate-pulse`} />
            </div>
          </div>
        </div>

        {/* Success Toast / Notification */}
        {successToast && (
          <div className="brutal-card bg-brutal-green border-2 border-brutal-dark p-4 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3 font-bold text-xs md:text-sm text-emerald-950">
              <CheckCircle className="w-5 h-5 text-emerald-800 shrink-0" />
              <span>{successToast}</span>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="w-6 h-6 rounded-lg border border-emerald-900 text-emerald-900 flex items-center justify-center hover:bg-white/40 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="brutal-card bg-red-100 border-2 border-brutal-dark p-4 flex items-center justify-between gap-3 text-red-950">
            <div className="flex items-center gap-3 font-bold text-xs md:text-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="w-6 h-6 rounded-lg border border-red-900 text-red-900 flex items-center justify-center hover:bg-white/40 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bento Grid Row 1: Dropzone Upload Card */}
        <section>
          <DropzoneCard onFilesSelected={handleFilesSelected} isProcessing={isProcessing} />
        </section>

        {/* Bento Grid Row 2: Live Statistics */}
        <section>
          <StatsBento
            totalFiles={parsedFiles.length}
            totalRows={totalRows}
          />
        </section>

        {/* Bento Grid Row 3: Uploaded Files Management (if any) */}
        {parsedFiles.length > 0 && (
          <section>
            <UploadedFilesList
              files={parsedFiles}
              onRemoveFile={handleRemoveFile}
              onClearAll={handleClearAll}
            />
          </section>
        )}

        {/* Bento Grid Row 4: Live Interactive Data Preview Table */}
        <section>
          <DataPreviewTable
            headers={headers}
            rows={rows}
            onDownload={handleDownloadExcel}
            onDownloadCsv={handleDownloadCsv}
            hasFiles={parsedFiles.length > 0}
          />
        </section>
      </main>
    </div>
  );
}
