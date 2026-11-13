import * as XLSX from 'xlsx';

// List of columns to strictly remove (normalized comparison)
export const EXCLUDED_COLUMNS_NORMALIZED = [
  'luaspeta',
  'validatortekstual',
  'validatorpeta',
  'blokirinternal',
  'pemilikpertama',
  'pemilikakhir',
];

export const DISPLAY_EXCLUDED_COLUMNS = [
  'Luas_Peta',
  'Validator_Tekstual',
  'Validator_Peta',
  'Blokir_Internal',
  'Pemilik_Pertama',
  'Pemilik_Akhir',
];

export const DISPLAY_KEPT_COLUMNS = [
  'Nomor_Hak',
  'Surat_Ukur',
  'NIB',
  'Luas',
  'Produk',
  'KW',
  'Tipe_Hak',
];

export interface ParsedFileResult {
  id: string;
  name: string;
  size: number;
  originalColumns: string[];
  retainedColumns: string[];
  removedColumns: string[];
  rows: (string | number | null | undefined)[][];
  rowCount: number;
}

export function normalizeHeader(header: string): string {
  if (!header) return '';
  return String(header).toLowerCase().replace(/[\s_\-]+/g, '').trim();
}

export function isExcludedColumn(header: string): boolean {
  const norm = normalizeHeader(header);
  return EXCLUDED_COLUMNS_NORMALIZED.includes(norm);
}

/**
 * Parses an Excel or CSV file and filters out excluded columns.
 */
export async function parseExcelFile(file: File): Promise<ParsedFileResult> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: true, raw: false });

  // Use the first sheet
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    throw new Error(`File ${file.name} tidak memiliki sheet yang valid.`);
  }

  const worksheet = workbook.Sheets[firstSheetName];
  // Parse as array of arrays (AOA)
  const rawData: (string | number | null | undefined)[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: '',
    blankrows: false,
  });

  if (!rawData || rawData.length === 0) {
    throw new Error(`File ${file.name} kosong atau tidak memiliki data.`);
  }

  // Find header row (usually row 0, but scan first 5 rows in case of title rows)
  let headerRowIndex = 0;
  for (let i = 0; i < Math.min(5, rawData.length); i++) {
    const row = rawData[i];
    if (row && row.some(cell => {
      const norm = normalizeHeader(String(cell || ''));
      return norm.includes('nomorhak') || norm.includes('suratukur') || norm.includes('nib') || norm.includes('luas');
    })) {
      headerRowIndex = i;
      break;
    }
  }

  const rawHeaders = (rawData[headerRowIndex] || []).map(cell => String(cell || '').trim());
  if (rawHeaders.length === 0) {
    throw new Error(`Header tidak ditemukan pada file ${file.name}`);
  }

  // Determine kept column indices
  const keptIndices: number[] = [];
  const originalColumns: string[] = [];
  const removedColumns: string[] = [];
  const retainedColumns: string[] = [];

  rawHeaders.forEach((header, idx) => {
    if (!header && header !== '0') return;
    originalColumns.push(header);
    if (isExcludedColumn(header)) {
      removedColumns.push(header);
    } else {
      keptIndices.push(idx);
      retainedColumns.push(header);
    }
  });

  // Extract filtered rows (skipping header)
  const filteredRows: (string | number | null | undefined)[][] = [];
  for (let i = headerRowIndex + 1; i < rawData.length; i++) {
    const row = rawData[i];
    if (!row || row.length === 0) continue;
    // Check if entire row is empty
    const hasData = row.some(val => val !== null && val !== undefined && String(val).trim() !== '');
    if (!hasData) continue;

    const newRow = keptIndices.map(idx => row[idx] ?? '');
    filteredRows.push(newRow);
  }

  return {
    id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
    name: file.name,
    size: file.size,
    originalColumns,
    retainedColumns,
    removedColumns,
    rows: filteredRows,
    rowCount: filteredRows.length,
  };
}

/**
 * Combines multiple parsed files into one consolidated dataset.
 */
export function mergeParsedFiles(files: ParsedFileResult[]): {
  headers: string[];
  rows: (string | number | null | undefined)[][];
  totalRows: number;
} {
  if (files.length === 0) {
    return { headers: DISPLAY_KEPT_COLUMNS, rows: [], totalRows: 0 };
  }

  // Use headers from first file or fallback to DISPLAY_KEPT_COLUMNS
  const masterHeaders = files[0].retainedColumns.length > 0 ? files[0].retainedColumns : DISPLAY_KEPT_COLUMNS;
  const mergedRows: (string | number | null | undefined)[][] = [];

  for (const file of files) {
    // If headers match exactly
    const isSameOrder = JSON.stringify(file.retainedColumns.map(normalizeHeader)) ===
      JSON.stringify(masterHeaders.map(normalizeHeader));

    if (isSameOrder) {
      mergedRows.push(...file.rows);
    } else {
      // Map columns by normalized header name
      const headerMap: { [normName: string]: number } = {};
      file.retainedColumns.forEach((h, idx) => {
        headerMap[normalizeHeader(h)] = idx;
      });

      for (const row of file.rows) {
        const remappedRow = masterHeaders.map(mh => {
          const normMh = normalizeHeader(mh);
          const colIdx = headerMap[normMh];
          return colIdx !== undefined ? row[colIdx] ?? '' : '';
        });
        mergedRows.push(remappedRow);
      }
    }
  }

  return {
    headers: masterHeaders,
    rows: mergedRows,
    totalRows: mergedRows.length,
  };
}

/**
 * Export consolidated data to .xlsx file with formatting and auto column width
 */
export function downloadMergedExcel(
  headers: string[],
  rows: (string | number | null | undefined)[][],
  customFileName: string
): void {
  const fullData = [headers, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(fullData);

  // Auto-fit column widths
  const colWidths = headers.map((colName, colIdx) => {
    let maxLength = String(colName).length;
    for (let r = 0; r < Math.min(rows.length, 100); r++) {
      const val = rows[r][colIdx];
      if (val !== undefined && val !== null) {
        maxLength = Math.max(maxLength, String(val).length);
      }
    }
    return { wch: Math.min(Math.max(maxLength + 3, 12), 40) };
  });
  worksheet['!cols'] = colWidths;

  // Add autofilter range
  const lastColLetter = XLSX.utils.encode_col(headers.length - 1);
  worksheet['!autofilter'] = { ref: `A1:${lastColLetter}${rows.length + 1}` };

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data_Gabungan');

  let sanitizedName = (customFileName || 'Hasil_Gabungan_Excel').trim();
  if (!sanitizedName.toLowerCase().endsWith('.xlsx')) {
    sanitizedName += '.xlsx';
  }

  XLSX.writeFile(workbook, sanitizedName);
}

/**
 * Export consolidated data to CSV file
 */
export function downloadMergedCsv(
  headers: string[],
  rows: (string | number | null | undefined)[][],
  customFileName: string
): void {
  const fullData = [headers, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(fullData);
  const csvContent = XLSX.utils.sheet_to_csv(worksheet);

  let sanitizedName = (customFileName || 'Hasil_Gabungan_Excel').trim();
  if (sanitizedName.toLowerCase().endsWith('.xlsx')) {
    sanitizedName = sanitizedName.substring(0, sanitizedName.length - 5);
  }
  if (!sanitizedName.toLowerCase().endsWith('.csv')) {
    sanitizedName += '.csv';
  }

  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', sanitizedName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates dummy sample Excel data for user testing
 */
export function createDemoFiles(): File[] {
  const dummyHeaders = [
    'Nomor_Hak',
    'Surat_Ukur',
    'NIB',
    'Luas',
    'Produk',
    'Luas_Peta',
    'Validator_Tekstual',
    'Validator_Peta',
    'Blokir_Internal',
    'KW',
    'Pemilik_Pertama',
    'Pemilik_Akhir',
    'Tipe_Hak',
  ];

  const file1Rows = [
    ['01234', '00123/2021', '02.01.03.01.01234', '350', 'Rutin', '352.5', 'Admin1', 'ValPeta2', 'Tidak Ada', 'KW 1', 'Budi Santoso', 'Budi Santoso', 'Hak Milik'],
    ['01235', '00124/2021', '02.01.03.01.01235', '420', 'PTSL', '419.0', 'Admin2', 'ValPeta1', 'Blokir Internal', 'KW 2', 'Siti Aminah', 'Ahmad Dani', 'Hak Guna Bangunan'],
    ['01236', '00125/2021', '02.01.03.01.01236', '180', 'Rutin', '180.0', 'Admin1', 'ValPeta1', 'Tidak Ada', 'KW 1', 'Joko Widodo', 'Joko Widodo', 'Hak Milik'],
  ];

  const file2Rows = [
    ['02451', '00341/2022', '02.01.03.02.02451', '500', 'PTSL', '501.2', 'Admin3', 'ValPeta3', 'Tidak Ada', 'KW 1', 'Hendra Setiawan', 'Hendra Setiawan', 'Hak Pakai'],
    ['02452', '00342/2022', '02.01.03.02.02452', '275', 'Rutin', '274.8', 'Admin1', 'ValPeta2', 'Tidak Ada', 'KW 3', 'Megawati', 'Rian Ardianto', 'Hak Milik'],
  ];

  const file3Rows = [
    ['03110', '00490/2023', '02.01.03.03.03110', '650', 'Redistribusi', '650.0', 'Admin2', 'ValPeta1', 'Tidak Ada', 'KW 1', 'Surya Paloh', 'Surya Paloh', 'Hak Milik'],
    ['03111', '00491/2023', '02.01.03.03.03111', '120', 'Rutin', '120.5', 'Admin4', 'ValPeta2', 'Tidak Ada', 'KW 2', 'Ridwan Kamil', 'Atalia Praratya', 'Hak Guna Bangunan'],
    ['03112', '00492/2023', '02.01.03.03.03112', '890', 'PTSL', '889.3', 'Admin1', 'ValPeta3', 'Tidak Ada', 'KW 1', 'Anies Baswedan', 'Anies Baswedan', 'Hak Milik'],
  ];

  const createExcelFile = (name: string, rows: (string | number)[][]): File => {
    const ws = XLSX.utils.aoa_to_sheet([dummyHeaders, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    return new File([out], name, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  };

  return [
    createExcelFile('Data_Kecamatan_Medan_Barat.xlsx', file1Rows),
    createExcelFile('Data_Kecamatan_Medan_Kota.xlsx', file2Rows),
    createExcelFile('Data_Kecamatan_Medan_Timur.xlsx', file3Rows),
  ];
}
