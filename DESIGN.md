# DESIGN.md — Design System & Visual Specification (Modern Elegant Batak)

> **Tujuan**: Spesifikasi desain lengkap untuk website undangan pernikahan adat Batak modern (**Modern Elegant Batak Toba Kristen**). Dokumen ini menjadi acuan tunggal (*single source of truth*) dalam implementasi visual, token warna, tipografi, serta ornamen budaya.

---

## 🏛️ Filosofi Desain (Design Intent)

- **Suasana**: Sakral, agung, penuh kehormatan adat, dan bersukacita ("Horas!"). Menghadirkan wibawa tradisi Batak Toba dalam balutan estetika kontemporer yang bersih dan elegan.
- **Tiga Warna Utama Gorga (Tilu Bolit)**:
  1. **Hitam (`#15100E`)**: Perlambang kepemimpinan, keteguhan, dan wibawa adat. Dipakai pada area panggung cover, section gelap firman, dan footer.
  2. **Merah Gorga (`#9B2C24`)**: Perlambang keberanian, kehangatan kekeluargaan, dan sukacita pernikahan. Dipakai sebagai warna utama tombol CTA, aksen badge, dan penekanan teks penting.
  3. **Putih/Krem Gading (`#FBF8F3` / `#FFFDF9`)**: Perlambang ketulusan dan kesucian janji nikah di hadapan Tuhan. Menjadi kanvas utama pembacaan informasi.
  4. **Benang Emas Tenun Ulos (`#B8924A` / `#D9B45E`)**: Aksen mewah hairline pemisah dan sulur ornamen.
- **Signature Visual**:
  - Cover gerbang **Fasad Rumah Bolon** terbelah dua (*split-gate reveal*) dengan atap pelana melengkung khas Sopo Godang.
  - Watermark halus motif **Gorga Ipon-ipon** (gerigi geometris pelindung) dan **Gorga Simeol-meol** (sulur gelombang sukacita).
  - Siluet geometris **Tenun Ulos** sebagai pendamping potret kedua mempelai di section Couple.

---

## 🎨 Palet Warna & Verifikasi Kontras Matematis (WCAG 2.1)

Seluruh token warna telah diverifikasi rasio kontrasnya menggunakan formula WCAG 2.1 Relative Luminance:

| Token CSS | Kode Warna | Penggunaan Utama | Kontras Rasio | Status WCAG |
| :--- | :--- | :--- | :--- | :--- |
| `--bg-web` | `#0E0A09` | Latar luar layar desktop | — | — |
| `--bg-main` / `--surface` | `#FFFDF9` | Kanvas kartu utama undangan | — | — |
| `--bg` | `#FBF8F3` | Latar utama section terang | — | — |
| `--bg-alt` | `#F4EEE6` | Latar section selang-seling (Events, Gift) | — | — |
| `--ink` | `#2B1E1A` | Teks judul & teks utama pada kanvas terang | **15.2:1** di `--bg` | ✅ **AAA Pass** |
| `--ink-muted` | `#5E4A42` | Teks sekunder, deskripsi, alamat | **7.8:1** di `--bg` | ✅ **AAA Pass** |
| `--night` | `#15100E` | Background panggung cover & section Firman | — | — |
| `--on-night` | `#F6F1EA` | Teks utama di atas background `--night` | **16.8:1** di `--night` | ✅ **AAA Pass** |
| `--gorga` | `#9B2C24` | **Merah Gorga**: Tombol CTA, badge acara | **7.1:1** di `--bg` | ✅ **AAA Pass** |
| `--gorga-bright` | `#E0645A` | Aksen merah di atas background `--night` | **5.5:1** di `--night` | ✅ **AA Pass** |
| `--gold` | `#B8924A` | Garis hairline, border, ornamen SVG | *(Bukan untuk teks)* | ✅ Aksen Dekoratif |
| `--gold-bright` | `#D9B45E` | Teks emas bercahaya di atas `--night` | **9.6:1** di `--night` | ✅ **AAA Pass** |
| `--gold-text` | `#7A5A22` | Teks label emas gelap di atas kanvas terang | **6.0:1** di `--bg` | ✅ **AA Pass** |
| `--line` | `#E6DDD0` | Hairline tipis 1px pada latar terang | — | Halus & Rapi |

> [!NOTE]
> Warna `--gold` (`#B8924A`) memiliki rasio 2.7:1 di atas background terang, sehingga **DILARANG KERAS** digunakan sebagai warna teks isi di atas kanvas terang. Gunakan `--gold-text` (`#7A5A22`) atau `--gorga` (`#9B2C24`) untuk label penekanan.

---

## 🔤 Sistem Tipografi

1. **Display Font (Judul, Nama Mempelai, Tanggal, Label Acara)**:
   - Font: **'Cinzel'**, Georgia, serif.
   - Sifat: Berwibawa, monumental, huruf kapital terstruktur rapi.
   - Tracking: `tracking-[0.1em]` hingga `tracking-[0.25em]` untuk kesan editorial mewah.
2. **Body Font (Isi Informasi, Deskripsi, Tombol, Alamat, Form RSVP)**:
   - Font: **'Plus Jakarta Sans'**, system-ui, sans-serif.
   - Sifat: Keterbacaan prima di layar smartphone kecil, modern, dan bersih.
3. **Pemberitahuan Khusus**:
   - Font teks Arab (Amiri) **ditiadakan** karena tema ini untuk pernikahan Batak Kristen. Tidak ada pemuatan font yang tidak terpakai demi menghemat ukuran bundle.

---

## 📐 Layout & Arsitektur Kartu

- **Struktur**: *Centered Mobile-First Card* (`max-w-xl mx-auto`).
- **Dimensi**:
  - Di layar HP (< 640px): Full bleed selebar layar 100% dengan padding internal yang lapang.
  - Di layar Tablet & Desktop (≥ 640px): Kartu elegan terpusat dengan bayangan halus `shadow-[0_10px_50px_rgba(0,0,0,0.5)]` di atas latar belakang malam tekstur Gorga redup.
- **Sudut Lengkung (Border Radius)**: `rounded-xs` (2px) hingga `rounded-sm` (4px). Garis tegas dan rapi, tanpa sudut oval melengkung besar yang kekanak-kanakan.

---

## 🚪 Spesifikasi Cover: Gerbang Rumah Bolon

1. **Komposisi 3 Zona**:
   - **Zona Atas**: Royal monogram Batak + teks label *"The Wedding Of"*.
   - **Zona Tengah**: Tipografi monumental nama panggilan kedua mempelai: **Daniel & Ruth** bersanding dengan tanggal sakral pernikahan.
   - **Zona Bawah**: Kotak penerima tamu berbingkai sudut Gorga cerah: *"Kepada Yth. Bapak/Ibu/Saudara/i: [Nama Tamu] di Tempat"* + Tombol CTA *"Buka Undangan"*.
2. **Mekanisme Animasi Gerbang (GSAP Split-Gate)**:
   - Bilah kiri dan kanan berupa siluet **Atap & Fasad Rumah Bolon** SVG berpadu garis pertemuan simetris di tengah.
   - Saat tombol *"Buka Undangan"* diklik:
     - Audio lagu Batak lembut langsung berputar di dalam gesture pengguna.
     - Konten teks memudar naik halus (durasi 0.25s, `power2.in`).
     - Fasad Rumah Bolon kiri bergeser ke kiri (`xPercent: -105`), bilah kanan bergeser ke kanan (`xPercent: 105`) dengan durasi 1.1s (`power3.inOut`).
     - Penutup cover menghilang dan fokus layar beralih ke `#main-content`.
   - Bila pengguna menyalakan `prefers-reduced-motion`, cover melakukan transisi fade-out instan (0.3s) tanpa geseran.

---

## 📋 Spesifikasi Rinci Per Section

| Section | Nuansa Latar | Elemen Budaya & Ornamen | Konten & Tipografi |
| :--- | :--- | :--- | :--- |
| **Hero + Countdown** | Terang (`--bg`) | Watermark Gorga hairline + siluet atap Rumah Bolon mini di atas judul | Salam *"Horas!"*, tanggal pernikahan besar, 4 kotak countdown waktu (Hari, Jam, Menit, Detik) |
| **Profil Mempelai (Couple)** | Terang (`--bg`) | Header emblem Gorga Simeol-meol simetris. Foto dengan siluet panel Ulos vertikal di belakang potret | Nama lengkap + gelar, penekanan **Marga** tebal, nama orang tua terhormat, tombol Instagram |
| **Rangkaian Acara (Events)** | Hangat (`--bg-alt`) | Kartu acara berbingkai hairline ganda dengan aksen sudut Gorga Ipon-ipon | 3 Agenda: **Martumpol**, **Pemberkatan Nikah (Gereja HKBP)**, **Pesta Adat Na Gok & Resepsi**. Tombol Google Maps resmi |
| **Ayat Alkitab (Doa/Firman)** | Gelap (`--night`) | Bingkai ganda emas berpadu aksen merah Gorga | Kutipan ayat suci pernikahan Kristen (**1 Korintus 13:4-8** atau **Matius 19:6**) terjemahan LAI |
| **Love Story** | Terang (`--bg`) | Garis timeline vertikal dengan penanda node segitiga Ipon-ipon | 3 Babak: Pertemuan Pertama, Mengikat Komitmen, Martumpol / Lamaran |
| **Galeri Foto** | Terang (`--bg`) | Grid foto prewedding berbingkai rapi + modal Lightbox layar penuh | Navigasi keyboard (Esc, panah kiri/kanan), touch swipe, caption foto momen prewedding |
| **Tanda Kasih (Gift)** | Hangat (`--bg-alt`) | Kartu rekening bank dengan ornamen sudut Gorga | Nomor rekening mempelai (BCA, Mandiri), tombol "Salin Nomor Rekening", toast notifikasi |
| **RSVP & Buku Tamu** | Terang (`--bg`) | Formulir konfirmasi kehadiran + daftar doa restu | Form nama, konfirmasi hadir, jumlah tamu, pesan ucapan. Adapter localStorage otomatis |
| **Penutup (Closing)** | Gelap (`--night`) | Siluet atap Rumah Bolon utuh SVG di atas ucapan perpisahan | Ucapan syukur dan terima kasih keluarga besar mempelai + hashtag resmi pernikahan |

---

## 🛑 Daftar Larangan Desain (Non-Negotiable)

1. Dilarang menggunakan font kaligrafi bersambung berlebihan (*cursive/script font*) yang sulit dibaca.
2. Dilarang menggunakan clipart bunga mawar cat air eropa (*watercolor botanical*).
3. Dilarang menggunakan gambar boneka Sigale-gale, topeng adat, atau patung pemujaan roh kuno.
4. Dilarang menggunakan gradient emas metalik berkilau kuno atau efek neon glow.
5. Dilarang memakai teks rata tengah (*center-aligned*) untuk paragraf isi yang panjang.
