# 📊 MergeXlsx - Penggabung Excel Kantor Pertanahan (Kantah Pro)

Aplikasi web modern untuk menggabungkan banyak berkas Excel (`.xlsx` / `.xls`) menjadi satu lembar kerja utuh dengan pembersihan kolom otomatis khusus format data hak atas tanah Kantor Pertanahan (BPN).

Dirancang dengan gaya visual **Soft Neo-Brutalism (Playful Neubrutalism)**, tata letak **Bento Grid**, dan skema warna **Split-Tone** (Dark Sidebar + Warm Off-White Canvas `#F6F5F0`).

---

## 🚀 Fitur Utama

- **Penggabungan Multi-File Instan**: Menggabungkan puluhan berkas Excel secara otomatis dalam hitungan detik.
- **Pembersihan Kolom Otomatis**: Secara otomatis memfilter dan menghapus kolom-kolom sensitif / internal yang tidak diperlukan.
- **Kustomisasi Penamaan File**: Pengguna bebas menentukan nama file hasil gabungan sebelum mengunduh.
- **Pratinjau Data Interaktif (Live Preview)**: Tabel pratinjau langsung lengkap dengan pencarian nomor hak / NIB dan paginasi.
- **100% Client-Side & Aman**: Seluruh pemrosesan berkas dilakukan langsung di browser Anda menggunakan SheetJS (`xlsx`). Tidak ada berkas yang dikirim ke server luar, menjaga kerahasiaan data pertanahan.
- **Export Multi-Format**: Mendukung ekspor ke format Excel (`.xlsx`) dan dokumen cetak rapi (`.pdf`).

---

## 📋 Aturan Pembersihan Kolom

Format berkas Excel input standar terdiri atas **13 kolom**:

```text
Nomor_Hak | Surat_Ukur | NIB | Luas | Produk | Luas_Peta | Validator_Tekstual | Validator_Peta | Blokir_Internal | KW | Pemilik_Pertama | Pemilik_Akhir | Tipe_Hak
```

### ✂️ 6 Kolom yang Dihapus Otomatis:
1. `Luas_Peta`
2. `Validator_Tekstual`
3. `Validator_Peta`
4. `Blokir_Internal`
5. `Pemilik_Pertama`
6. `Pemilik_Akhir`

### ✅ 7 Kolom Hasil Akhir yang Disimpan:
1. `Nomor_Hak`
2. `Surat_Ukur`
3. `NIB`
4. `Luas`
5. `Produk`
6. `KW`
7. `Tipe_Hak`

---

## 🎨 Desain: Soft Neo-Brutalism & Bento Grid

- **Layout Split-Tone**: Bilah samping gelap (*Dark Sidebar* `#121212`) dipadukan dengan kanvas utama krem hangat (*Warm Off-White* `#F6F5F0`).
- **Kartu & Tombol**: Sudut membulat tegas (`rounded-2xl`), garis tepi hitam tebal (`border: 2px solid #111111`), serta bayangan jatuh pekat tanpa blur (`box-shadow: 4px 4px 0px #111111`).
- **Palet Pastel Playful**:
  - 🧈 **Butter Yellow**: `#FEF08A`
  - 🌸 **Soft Pink**: `#FBCFE8`
  - 🍵 **Matcha Green**: `#BBF7D0`
  - 🌊 **Baby Blue**: `#BAE6FD`
- **Tipografi**: Geometric sans-serif (*Plus Jakarta Sans* / *Inter*) dengan hierarki angka tebal dan micro-label huruf kapital.
- **Lencana Kapsul (Pill Badges)**: Berwarna hitam pekat (`#111111`) dengan kontras teks putih.

---

## 💻 Menjalankan Secara Lokal

1. **Clone repositori**:
   ```bash
   git clone https://github.com/bagasdwisss/convertexcel.git
   cd convertexcel
   ```

2. **Pasang dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:5173`.

4. **Kompilasi produksi (Build)**:
   ```bash
   npm run build
   ```

---

## ☁️ Deploy ke Vercel

Proyek ini telah dikonfigurasi dan dioptimasi penuh untuk Vercel:

### Opsi 1: Otomatis via Dashboard Vercel (Rekomendasi)
1. Buka [Vercel Dashboard](https://vercel.com/new).
2. Pilih repositori **`bagasdwisss/convertexcel`**.
3. Framework Preset akan otomatis terdeteksi sebagai **Vite**.
4. Klik **Deploy**!

### Opsi 2: Menggunakan Vercel CLI
```bash
npx vercel
```

---

Dibuat dengan ❤️ untuk kemudahan pengelolaan data Kantor Pertanahan.
