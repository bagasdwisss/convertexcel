import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  AlertTriangle, 
  CheckCircle, 
  X,
  ArrowRight
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DropzoneCard } from './components/DropzoneCard';
import { StatsBento } from './components/StatsBento';
import { RulesCard } from './components/RulesCard';
import { UploadedFilesList } from './components/UploadedFilesList';
import { DataPreviewTable } from './components/DataPreviewTable';
import { 
  parseExcelFile, 
  mergeParsedFiles, 
  downloadMergedExcel, 
  downloadMergedCsv,
  createDemoFiles,
  ParsedFileResult,
  DISPLAY_EXCLUDED_COLUMNS,
  DISPLAY_KEPT_COLUMNS
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

  // Load demo sample data
  const handleLoadDemo = async () => {
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      const demoFiles = createDemoFiles();
      const demoParsed: ParsedFileResult[] = [];
      for (const file of demoFiles) {
        const parsed = await parseExcelFile(file);
        demoParsed.push(parsed);
      }
      setParsedFiles(demoParsed);
      setSuccessToast('3 File Demo berhasil dimuat!');
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (err: any) {
      setErrorMessage('Gagal memuat file demo.');
    } finally {
      setIsProcessing(false);
    }
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
      // ignore in environments where canvas is unavailable
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
        onLoadDemo={handleLoadDemo}
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
              Otomatis membersihkan kolom Luas_Peta, Validator, Blokir, dan Pemilik menjadi satu lembar kerja siap olah.
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
            removedColumnsCount={DISPLAY_EXCLUDED_COLUMNS.length}
            keptColumnsCount={DISPLAY_KEPT_COLUMNS.length}
          />
        </section>

        {/* Bento Grid Row 3: Column Filtering Transformation Schema Card */}
        <section>
          <RulesCard />
        </section>

        {/* Bento Grid Row 4: Uploaded Files Management (if any) */}
        {parsedFiles.length > 0 && (
          <section>
            <UploadedFilesList
              files={parsedFiles}
              onRemoveFile={handleRemoveFile}
              onClearAll={handleClearAll}
            />
          </section>
        )}

        {/* Bento Grid Row 5: Live Interactive Data Preview Table */}
        <section>
          <DataPreviewTable
            headers={headers}
            rows={rows}
            onDownload={handleDownloadExcel}
            onDownloadCsv={handleDownloadCsv}
            hasFiles={parsedFiles.length > 0}
          />
        </section>

        {/* Bento Bottom Info Card */}
        <footer className="pt-6 pb-8 border-t-2 border-brutal-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brutal-green border border-brutal-dark" />
            <span>Format BPN Kantah: Nomor_Hak, Surat_Ukur, NIB, Luas, Produk, KW, Tipe_Hak</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/bagasdwisss/convertexcel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brutal-dark hover:underline flex items-center gap-1 font-black"
            >
              GitHub Repository
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
