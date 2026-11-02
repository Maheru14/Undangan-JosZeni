# AGENTS.md — AI Agent Guidelines & Architecture Manual (Tema Batak)

> **Mission**: Panduan komprehensif bagi AI Coding Agent untuk memahami arsitektur, filosofi desain, dan cara membangun/mengeksekusi website undangan digital pernikahan adat Batak modern (**Modern Elegant Batak Toba Kristen**) di repositori ini.

---

## ⚡ Prinsip Utama: Eksekusi Langsung & Preservasi Arsitektur

> [!IMPORTANT]
> Proyek ini adalah implementasi **Modern Elegant Batak** (reskin dari arsitektur teruji).
> **JANGAN MENGUBAH LAYOUT ATAU MEKANISME TRANSISI!**
> Seluruh tata letak kartu terpusat (`max-w-xl`), sekuens animasi GSAP (split-gate cover, durasi, easing, cubic-bezier), ritme visual terang-gelap, hook kustom, dan fitur interaktif **DIJAGA 100% PERSIS**.
> Yang diimplementasikan adalah:
> 1. **Aset Budaya Batak**: Menggantikan elemen Jawa (Gunungan → Rumah Bolon, Wayang → Stilisasi Ulos, Batik Kawung → Gorga Ipon-ipon & Simeol-meol).
> 2. **Palet Warna Tiga Benang Gorga**: Merah Gorga (`#9B2C24`), Hitam Gorga (`#15100E`), dan Putih/Krem (`#FBF8F3`) dengan aksen hairline emas benang tenun (`#B8924A`).
> 3. **Data Mempelai & Rangkaian Adat Batak Kristen**: Martumpol, Pemberkatan Nikah di Gereja HKBP, dan Pesta Unjuk / Adat Batak & Resepsi.
> 4. **Ayat Firman Tuhan (Alkitab LAI Terjemahan Baru)**: Menggantikan ayat Al-Qur'an. Blok Arab ditiadakan.

---

## 🏗️ Tech Stack & Ekosistem Proyek

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/) (dengan *code-splitting* via `React.lazy`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan CSS Variables Token System
- **Animasi DOM**: [GSAP 3](https://greensock.com/gsap/) (untuk sequence cover Rumah Bolon & scroll reveal)
- **3D Graphics**: [Three.js](https://threejs.org/) (prosedural, debu emas halus; dinonaktifkan default demi performa mobile)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Linter**: [oxlint](https://oxc.rs/)

---

## 📂 Struktur Repositori

```bash
├── public/
│   ├── audio/              # File musik latar Batak (gondang/uning-uningan lembut)
│   └── images/
│       ├── couple/         # Foto kedua mempelai (groom.webp, bride.webp)
│       └── gallery/        # Foto galeri prewedding
├── src/
│   ├── config/
│   │   └── wedding.config.ts  # 🔥 SINGLE SOURCE OF TRUTH (Data mempelai, acara, galeri, aset)
│   ├── context/
│   │   └── AppContext.tsx     # State pembukaan undangan (isOpened), audio, guest name
│   ├── styles/
│   │   ├── tokens.css         # Token warna Batak ([data-theme="batak"] dan :root)
│   │   ├── base.css           # Typography defaults & paper texture utility
│   │   └── index.css          # Tailwind CSS v4 setup & @theme mapping
│   ├── sections/              # Komponen modular per bagian undangan
│   │   ├── Cover/             # Cover Rumah Bolon split-gate interaktif
│   │   │   ├── index.tsx
│   │   │   └── RumahBolonGate.tsx  # Fasad Rumah Bolon SVG terbelah dua
│   │   ├── Hero.tsx           # Salam "Horas!" & countdown hari bahagia
│   │   ├── Couple.tsx         # Profil kedua mempelai (marga, orang tua)
│   │   ├── Events.tsx         # Martumpol, Pemberkatan HKBP, Pesta Adat
│   │   ├── Doa.tsx            # Ayat Firman Tuhan (1 Korintus 13:4-8 / Matius 19:6)
│   │   ├── Gallery/           # Foto galeri & lightbox preview
│   │   ├── LoveStory.tsx      # Timeline perjalanan cinta (aksen node Gorga)
│   │   ├── Rsvp/              # Formulir kehadiran & ucapan selamat
│   │   ├── Gift.tsx           # Tanda kasih digital (rekening bank & alamat)
│   │   └── Closing.tsx        # Ucapan terima kasih keluarga besar
│   ├── components/
│   │   ├── decor/
│   │   │   ├── GorgaWatermark.tsx  # Watermark motif Gorga Ipon-ipon & Simeol-meol
│   │   │   ├── CornerOrnament.tsx  # Sudut bingkai Gorga SVG
│   │   │   ├── Divider.tsx         # Garis hairline dengan aksen geometris Batak
│   │   │   └── GorgaBackground.tsx # Latar tekstur redup di luar kartu
│   │   ├── layout/            # BottomNav.tsx, MusicToggle.tsx, Reveal.tsx
│   │   └── ui/                # PhotoFrame.tsx, CouplePortrait.tsx, Toast.tsx
│   ├── hooks/                 # useAudio, useCountdown, useGuestName, useScrollSpy
│   ├── lib/
│   │   └── storageAdapter.ts  # LocalStorage adapter buku tamu & ucapan
│   ├── App.tsx                # Komposisi utama halaman & Suspense loader
│   └── main.tsx               # Root entry point
```

---

## 🛡️ Aturan Budaya & Larangan Desain (Batak Toba Kristen)

1. **Wajib Dihormati**:
   - Penulisan nama mempelai menyertakan **marga** (misal: *Simanjuntak*, *br. Siregar*). Marga ibu ditulis dengan prefiks *br.* (boru).
   - Salam pembuka khas Batak: **"Horas!"** atau salam damai sejahtera Kristiani.
   - Acara pernikahan adat Batak Kristen baku terdiri dari:
     1. **Martumpol** (Ikat janji pranikah di gereja)
     2. **Pemberkatan Nikah** (Sakramen pernikahan kudus di hadapan Pendeta)
     3. **Pesta Unjuk / Pesta Adat Na Gok & Resepsi** (Upacara adat Batak penerimaan ulos & jamuan makan)
   - Teks firman Tuhan diambil dari Alkitab Terjemahan Baru (Lembaga Alkitab Indonesia - LAI). Teks tidak boleh ditulis dari ingatan bebas.
2. **Daftar Larangan Keras (Cultural Taboos & Visual Anti-Patterns)**:
   - ❌ **DILARANG menggunakan figur Sigale-gale** (Sigale-gale adalah patung kayu terkait ritual upacara duka cita/kematian, bukan pernikahan).
   - ❌ **DILARANG menggunakan patung/figur berhala atau topeng adat mistis**.
   - ❌ **DILARANG menggunakan Gorga Jenggar, Jorngom, Boraspati, atau Adop-adop sebagai ornamen dekorasi utama** (motif tersebut memiliki muatan sakral penjaga/magis kuno).
   - ✅ **HANYA GUNAKAN motif Gorga netral**: **Gorga Ipon-ipon** (pola gerigi tepi/geometris pelindung keharmonisan) dan **Gorga Simeol-meol** (sulur gelombang lambang sukacita dan kebahagiaan).
   - ❌ **DILARANG menggunakan dominasi warna merah menyala atau motif pelangi norak** yang merusak suasana sakral. Warna merah dibatasi pada token `--gorga` (`#9B2C24`) sebagai aksen regal dan CTA.
   - ❌ **DILARANG menggunakan Surat Batak (aksara kuno)** kecuali bila teks ejaan telah diverifikasi valid oleh penutur asli.

---

## ⚡ Aturan Performa & Kualitas Teknis

1. **Performa Mobile 60 FPS**:
   - Web dibuka di smartphone (iOS Safari / Android Chrome).
   - Seluruh ornamen budaya dibuat dalam bentuk **inline SVG murni beresolusi tinggi** yang ringan (< 3 KB per ornamen), bebas beban HTTP image download.
2. **Autoplay Policy**:
   - Audio latar (BGM) dipicu saat tombol "Buka Undangan" ditekan oleh pengguna.
   - Floating music toggle selalu tersedia di pojok kanan bawah.
3. **Aksesibilitas (A11y)**:
   - Semua ornamen dekoratif SVG wajib memiliki atribut `aria-hidden="true"`.
   - Rasio kontras teks wajib memenuhi standar WCAG 2.1 AA (minimal 4.5:1 untuk teks normal, 3:1 untuk teks besar).
   - Mendukung `prefers-reduced-motion` untuk mematikan animasi transisi berat.

---

## 🧪 Validasi Eksekusi

Sebelum menyatakan pekerjaan selesai, AI wajib memverifikasi:
```bash
npm run lint    # Wajib 0 errors dan 0 warnings
npm run build   # Wajib lolos TypeScript compilation & Vite bundle
```
