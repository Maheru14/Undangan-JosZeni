# PLAN.md — Master Execution Blueprint (Modern Elegant Batak Toba Kristen)

> **PETUNJUK BAGI AI AGENT**:
> Dokumen ini adalah cetak biru eksekusi mandiri (*zero-dependency self-contained blueprint*). Ketika Anda membaca dokumen ini di repositori target, **JANGAN BERTANYA LAGI KEPADA PENGGUNA**. Seluruh kode komponen SVG, token CSS, data dummy realistis, konfigurasi TypeScript, dan urutan pengerjaan telah didefinisikan secara lengkap di bawah ini.
> **LANGSUNG EKSEKUSI TAHAP DEMI TAHAP** hingga `npm run lint` dan `npm run build` berhasil 100%.

---

## 📑 DAFTAR ISI BLUEPRINT

1. [Spesifikasi Data Single Source of Truth (`src/config/wedding.config.ts`)](#1-spesifikasi-data-weddingconfigts)
2. [Sistem Desain Token CSS & Tailwind v4 (`src/styles/tokens.css` & `src/styles/index.css`)](#2-token-css--tailwind-v4)
3. [Implementasi Lengkap Seluruh Komponen Vektor SVG Budaya Batak](#3-komponen-vektor-svg-budaya-batak)
   - 3.1 `src/sections/Cover/RumahBolonGate.tsx` (Gerbang Fasad Rumah Bolon Terbelah)
   - 3.2 `src/components/decor/GorgaWatermark.tsx` (Watermark Ipon-ipon & Simeol-meol)
   - 3.3 `src/components/decor/CornerOrnament.tsx` (Ornamen Sudut Gorga)
   - 3.4 `src/components/decor/Divider.tsx` (Pemisah Garis Geometris Batak)
   - 3.5 `src/components/decor/GorgaBackground.tsx` (Latar Belakang Global Redup)
   - 3.6 `src/components/ui/PhotoFrame.tsx` (Bingkai Pelana Rumah Bolon)
   - 3.7 `src/components/ui/CouplePortrait.tsx` (Potret Bebas-Card & Panel Ulos Pendamping)
4. [Penyesuaian Seluruh Section Undangan](#4-penyesuaian-seluruh-section)
5. [Konfigurasi Index HTML & Font (`index.html`)](#5-konfigurasi-indexhtml)
6. [Adapter Penyimpanan RSVP (`src/lib/storageAdapter.ts`)](#6-adapter-penyimpanan-rsvp)
7. [Checklist Urutan Pengerjaan & Verifikasi Akhir](#7-checklist-urutan-pengerjaan)

---

## 1. Spesifikasi Data `wedding.config.ts`

Tulis berkas `src/config/wedding.config.ts` dengan data Batak Toba Kristen realistis berikut:

```typescript
export interface CouplePerson {
  fullName: string;
  shortName: string;
  marga: string;
  title?: string;
  parents: {
    father: string;
    mother: string;
  };
  instagram?: string;
  photo: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  isoDate: string;
  time: string;
  venueName: string;
  address: string;
  mapsUrl: string;
}

export interface LoveStoryItem {
  year: string;
  title: string;
  story: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  caption?: string;
}

export interface GiftItem {
  type: 'bank' | 'qris' | 'address';
  provider: string;
  accountNumber: string;
  accountHolder: string;
  note?: string;
}

export interface WeddingConfig {
  meta: {
    themeLabel: string;
  };
  couple: {
    groom: CouplePerson;
    bride: CouplePerson;
  };
  events: WeddingEvent[];
  countdown: {
    targetIsoDate: string;
    expiredLabel: string;
  };
  quote: {
    verse: string;
    translation: string;
    source: string;
  };
  loveStory: LoveStoryItem[];
  gallery: GalleryItem[];
  gifts: GiftItem[];
  audio: {
    src: string;
    title: string;
  };
  hashtag: string;
  greeting: {
    traditional: string;
    opening: string;
  };
  closingMessage: string;
  flags: {
    ambient3d: {
      enabled: boolean;
    };
    heroVideo: {
      enabled: false;
    };
  };
}

export const weddingConfig: WeddingConfig = {
  meta: {
    themeLabel: 'Undangan Pernikahan Adat Batak Toba',
  },
  couple: {
    groom: {
      fullName: 'Daniel Hasudungan Simanjuntak',
      shortName: 'Daniel',
      marga: 'Simanjuntak',
      title: 'S.T., M.Sc.',
      parents: {
        father: 'Bpk. St. Marolop Simanjuntak',
        mother: 'Ibu Rosmawati br. Nainggolan',
      },
      instagram: 'daniel.simanjuntak',
      photo: '/images/couple/groom.webp',
    },
    bride: {
      fullName: 'Ruth Gabriella br. Siregar',
      shortName: 'Ruth',
      marga: 'br. Siregar',
      title: 'S.E., M.B.A.',
      parents: {
        father: 'Bpk. Ir. Tumpal Siregar',
        mother: 'Ibu Lamria br. Hutapea',
      },
      instagram: 'ruth.gabriella',
      photo: '/images/couple/bride.webp',
    },
  },
  events: [
    {
      id: 'martumpol',
      name: 'Ikat Janji Pranikah (Martumpol)',
      date: 'Sabtu, 28 November 2026',
      isoDate: '2026-11-28T09:00:00+07:00',
      time: '09.00 - 11.00 WIB',
      venueName: 'Gereja HKBP Sudirman Medan',
      address: 'Jl. Jenderal Sudirman No. 12, Medan Polonia, Kota Medan, Sumatera Utara',
      mapsUrl: 'https://maps.google.com/?q=HKBP+Sudirman+Medan',
    },
    {
      id: 'pemberkatan',
      name: 'Pemberkatan Kudus Pernikahan',
      date: 'Sabtu, 12 Desember 2026',
      isoDate: '2026-12-12T09:00:00+07:00',
      time: '09.00 - 11.30 WIB',
      venueName: 'Gereja HKBP Sudirman Medan',
      address: 'Jl. Jenderal Sudirman No. 12, Medan Polonia, Kota Medan, Sumatera Utara',
      mapsUrl: 'https://maps.google.com/?q=HKBP+Sudirman+Medan',
    },
    {
      id: 'adat',
      name: 'Pesta Adat Na Gok & Resepsi',
      date: 'Sabtu, 12 Desember 2026',
      isoDate: '2026-12-12T12:00:00+07:00',
      time: '12.00 WIB - Selesai',
      venueName: 'Wisma Taman Sari Indah',
      address: 'Jl. Kapten Muslim No. 94, Dwi Kora, Kec. Medan Helvetia, Kota Medan',
      mapsUrl: 'https://maps.google.com/?q=Wisma+Taman+Sari+Medan',
    },
  ],
  countdown: {
    targetIsoDate: '2026-12-12T09:00:00+07:00',
    expiredLabel: 'Seluruh Rangkaian Pesta Pernikahan Telah Selesai Dilaksanakan',
  },
  quote: {
    verse: '1 Korintus 13:4, 7-8a',
    translation:
      'Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia menutupi segala sesuatu, percaya segala sesuatu, mengharapkan segala sesuatu, menuntut segala sesuatu. Kasih tidak berkesudahan.',
    source: 'Alkitab (Terjemahan Baru - LAI)',
  },
  loveStory: [
    {
      year: '2020',
      title: 'Awal Pertemuan di Perantauan',
      story:
        'Dipertemukan dalam sebuah persekutuan pemuda perantau di Kota Bandung. Percakapan singkat selepas ibadah membuka persahabatan hangat yang sarat dengan kesamaan nilai dan prinsip hidup.',
    },
    {
      year: '2023',
      title: 'Menjalin Komitmen Bersama',
      story:
        'Dengan restu kedua orang tua dan sanak kerabat, kami saling berjanji untuk melangkah bersama dalam ikatan kasih yang tulus, saling menopang dan menguatkan satu sama lain.',
    },
    {
      year: '2026',
      title: 'Prosesi Marhusip & Martumpol',
      story:
        'Keluarga besar kedua belah pihak bermusyawarah dalam kehangatan adat Batak (Marhusip), disusul dengan peneguhan ikrar janji suci di hadapan jemaat Tuhan dalam prosesi Martumpol.',
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      src: '/images/gallery/photo-1.webp',
      thumb: '/images/gallery/photo-1.webp',
      alt: 'Foto Prewedding Busana Adat Batak Toba & Tenun Ulos',
      caption: 'Busana Adat Batak Toba & Balutan Ulos Ragi Hotang',
    },
    {
      id: 'gal-2',
      src: '/images/gallery/photo-2.webp',
      thumb: '/images/gallery/photo-2.webp',
      alt: 'Momen Prewedding di Tepian Danau Toba',
      caption: 'Pesona Lanskap Pusuk Buhit Danau Toba',
    },
    {
      id: 'gal-3',
      src: '/images/gallery/photo-3.webp',
      thumb: '/images/gallery/photo-3.webp',
      alt: 'Potret Kasual Elegan Berdua',
      caption: 'Hangatnya Kebersamaan Menjelang Hari Bahagia',
    },
    {
      id: 'gal-4',
      src: '/images/gallery/photo-4.webp',
      thumb: '/images/gallery/photo-4.webp',
      alt: 'Suasana Desa Adat Samosir',
      caption: 'Di Pelataran Perkampungan Tradisional Batak',
    },
    {
      id: 'gal-5',
      src: '/images/gallery/photo-5.webp',
      thumb: '/images/gallery/photo-5.webp',
      alt: 'Senyum Bahagia Kedua Mempelai',
      caption: 'Tawa & Sukacita Mengiringi Langkah Kami',
    },
    {
      id: 'gal-6',
      src: '/images/gallery/photo-6.webp',
      thumb: '/images/gallery/photo-6.webp',
      alt: 'Detail Kain Tenun Ulos Sadum',
      caption: 'Keanggunan Tenun Tradisional Warisan Leluhur',
    },
  ],
  gifts: [
    {
      type: 'bank',
      provider: 'Bank Central Asia (BCA)',
      accountNumber: '5221348890',
      accountHolder: 'Daniel Hasudungan Simanjuntak',
      note: 'Transfer Rekening Mempelai Pria',
    },
    {
      type: 'bank',
      provider: 'Bank Mandiri',
      accountNumber: '1090018899234',
      accountHolder: 'Ruth Gabriella Siregar',
      note: 'Transfer Rekening Mempelai Wanita',
    },
    {
      type: 'address',
      provider: 'Alamat Pengiriman Kado Fisik',
      accountNumber: 'Komp. Setia Budi Indah Blok VV No. 18, Medan Sunggal, Kota Medan 20132',
      accountHolder: 'Penerima: Keluarga St. M. Simanjuntak / Daniel',
      note: 'Mohon konfirmasi via WhatsApp sebelum pengiriman',
    },
  ],
  audio: {
    src: '/audio/bgm.mp3',
    title: 'Gondang Hasapi & Uning-uningan Batak Toba (Instrumen Lembut)',
  },
  hashtag: '#DanielRuthMarsahala',
  greeting: {
    traditional: 'Horas Ma Di Hita Saluhutna',
    opening: 'Salam Damai Sejahtera Dalam Kasih Tuhan Yesus Kristus',
  },
  closingMessage:
    'Merupakan suatu kehormatan dan kebahagiaan yang sangat besar bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kedua mempelai. Kiranya kasih dan damai sejahtera Tuhan Yesus Kristus senantiasa menyertai kita sekalian. Horas!',
  flags: {
    ambient3d: {
      enabled: false,
    },
    heroVideo: {
      enabled: false,
    },
  },
};
```

---

## 2. Sistem Desain Token CSS & Tailwind v4 (Master Color Palettes)

### 🎨 REPOSITORI MASTER COLOR PALETTE

Repositori ini mendukung **dua palet warna budaya Batak modern** yang terdokumentasi secara presisi dan dapat diaktifkan kapan saja tanpa error:

---

#### 🏛️ PALET WARNA #1: Classic Tilu Bolit (Hitam Gorga, Merah Gorga, Gading Royal & Benang Emas)
> **Filosofi**: Terinspirasi dari tiga benang sakral (*Tilu Bolit*) Gorga Batak Toba — Merah Gorga (*kesatriaan/hasangapon*), Hitam (*wibawa/hagabeon*), dan Putih/Gading (*kesucian/hamoraon*) dengan aksen benang tenun emas ulos.

```css
/* Definisi Token Palet #1 (Aktifkan via [data-theme="palette-1"]) */
[data-theme="palette-1"] {
  --bg-web: #0E0A09;          /* Background web paling luar */
  --bg-main: #FFFDF9;         /* Background utama kartu: gading royal */
  --bg: #FBF8F3;              /* Background krem putih hangat */
  --bg-alt: #F4EEE6;          /* Background selang-seling */
  --surface: #FFFDF9;         /* Warna card putih/krem */
  --surface-alt: #EFE8DC;     /* Warna container dalam card */
  --ink: #2B1E1A;             /* Teks utama: espresso charcoal pekat (kontras 15.2:1) */
  --ink-muted: #5E4A42;       /* Teks sekunder: coklat kayu hangat (kontras 7.8:1) */
  --night: #15100E;           /* Warna gelap panggung cover & section firman */
  --on-night: #F6F1EA;        /* Teks di atas panggung malam (kontras 16.8:1) */
  --gorga: #9B2C24;           /* Merah Gorga khas Batak (kontras 7.1:1 di atas bg) */
  --gorga-bright: #E0645A;    /* Merah menyala di atas section malam (kontras 5.5:1) */
  --gold: #B8924A;            /* Benang emas ulos untuk garis border & ornamen SVG */
  --gold-bright: #D9B45E;     /* Emas bersinar di atas section malam (kontras 9.6:1) */
  --gold-text: #7A5A22;       /* Teks aksen emas terbaca jelas di atas krem (kontras 6.0:1) */
  --sage: #4F5B4A;            /* Aksen sekunder */
  --line: #E6DDD0;            /* Garis pemisah hairline di atas krem */
  --shadow-btn: rgba(155, 44, 36, 0.4);
  --shadow-subtle: 0 1px 4px rgba(43, 30, 26, 0.08);

  /* Aset Budaya Palet #1 */
  --asset-gorga-illustration: url('/images/gorga/batak-batik-illustration.webp');
  --asset-web-pattern: url('/images/gorga/batak-web-pattern.webp');
  --asset-border-strip: url('/images/gorga/batak-border-strip.webp');
  --asset-flower-corner: url('/images/flowers/palette-1/1-floral-corner.webp');
  --asset-flower-wreath: url('/images/flowers/palette-1/2-floral-wreath.webp');
  --asset-flower-bouquet: url('/images/flowers/palette-1/3-floral-bouquet.webp');
  --asset-flower-arch: url('/images/flowers/palette-1/4-floral-arch.webp');
  --asset-flower-crest: url('/images/flowers/palette-1/5-floral-crest.webp');
  --bg-web-gradient-from: #0A0706;
  --bg-web-gradient-via: #140C0A;
  --bg-web-gradient-to: #080504;
}
```

---

#### 🌊 PALET WARNA #2: Danau Toba Royal Sapphire & Midnight Navy with Champagne Gold Thread (AKTIF)
> **Filosofi**: Diadopsi langsung dari foto-foto galeri prewedding kedua mempelai — busana kebaya *Royal Sapphire Blue* berpayet emas yang dikenakan Zeni (`#174382`, `#2E6FD4`), setelan jas *Midnight Navy* Jos (`#071224`), pemandangan birunya perairan Danau Toba (`#060D1A`), langit cerah kristal, dan aksen tenun ulos emas champagne (`#B38E46`, `#DFC48A`).

```css
/* Definisi Token Palet #2 (Default :root & [data-theme="palette-2"]) */
:root,
:root[data-theme="palette-2"],
[data-theme="palette-2"],
[data-theme="batak"] {
  --bg-web: #060D1A;          /* Background web paling luar: Danau Toba Sapphire Night */
  --bg-main: #F7FAFD;         /* Background utama kartu: porcelain pearl white dengan refleksi danau jernih */
  --bg: #F0F5FA;              /* Background ice sapphire paper lembut */
  --bg-alt: #E5EFF8;          /* Background selang-seling: sutra biru es */
  --surface: #FFFFFF;         /* Warna card putih murni kristal */
  --surface-alt: #DFEBF7;     /* Warna container dalam card: sapphire tint */
  --ink: #0A1628;             /* Teks utama: midnight navy pekat (kontras 16.5:1 terhadap bg-main) */
  --ink-muted: #344C6E;       /* Teks sekunder: slate blue danau toba (kontras 7.2:1) */
  --night: #071224;           /* Warna gelap panggung cover & section firman */
  --on-night: #F0F6FC;        /* Teks di atas panggung malam (kontras 17:1) */
  --gorga: #174382;           /* Royal Sapphire Blue dari busana Zeni di tepian Danau Toba */
  --gorga-bright: #2E6FD4;    /* Luminous Sapphire Blue menyala di atas section malam */
  --gold: #B38E46;            /* Benang emas ulos champagne */
  --gold-bright: #DFC48A;     /* Emas champagne bersinar di atas navy */
  --gold-text: #6E5220;       /* Teks aksen emas terbaca jelas di atas putih */
  --sage: #2C526A;            /* Aksen sekunder: pinus Danau Toba */
  --line: #D0E2F2;            /* Garis pemisah hairline biru es */
  --shadow-btn: rgba(23, 67, 130, 0.45);
  --shadow-subtle: 0 1px 4px rgba(10, 22, 40, 0.08);

  /* Aset Budaya Palet #2 */
  --asset-gorga-illustration: url('/images/gorga/batak-gorga-sapphire.webp');
  --asset-web-pattern: url('/images/gorga/batak-web-sapphire.webp');
  --asset-border-strip: url('/images/gorga/batak-border-sapphire.webp');
  --asset-flower-corner: url('/images/flowers/palette-2/1-floral-corner.webp');
  --asset-flower-wreath: url('/images/flowers/palette-2/2-floral-wreath.webp');
  --asset-flower-bouquet: url('/images/flowers/palette-2/3-floral-bouquet.webp');
  --asset-flower-arch: url('/images/flowers/palette-2/4-floral-arch.webp');
  --asset-flower-crest: url('/images/flowers/palette-2/5-floral-crest.webp');
  --bg-web-gradient-from: #060D1A;
  --bg-web-gradient-via: #09162D;
  --bg-web-gradient-to: #040810;
}
```

---

#### 🔄 CARA BERALIH ANTARA PALET #1 DAN PALET #2 SECARA INSTAN:
Untuk mengaktifkan kembali **Palet #1** kapan saja tanpa ada yang salah:
1. Tambahkan atribut `data-theme="palette-1"` pada tag `<html>` atau `<body>` di `index.html` / `App.tsx`:
   ```html
   <html lang="id" data-theme="palette-1">
   ```
   Atau di `src/styles/tokens.css`, tukar `:root` ke blok Palet #1.
2. Untuk kembali ke **Palet #2**, gunakan `data-theme="palette-2"` (atau hapus atribut tersebut karena Palet #2 sudah default `:root`).

---

### Pemetaan di `src/styles/index.css`:
```css
@import "tailwindcss";
@import "./tokens.css";
@import "./base.css";

@theme {
  --color-bg-web: var(--bg-web);
  --color-bg-main: var(--bg-main);
  --color-bg: var(--bg);
  --color-bg-alt: var(--bg-alt);
  --color-surface: var(--surface);
  --color-surface-alt: var(--surface-alt);
  --color-ink: var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-night: var(--night);
  --color-on-night: var(--on-night);
  --color-gorga: var(--gorga);
  --color-gorga-bright: var(--gorga-bright);
  --color-gold: var(--gold);
  --color-gold-bright: var(--gold-bright);
  --color-gold-text: var(--gold-text);
  --color-sage: var(--sage);
  --color-line: var(--line);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --radius-sm: var(--radius);
}
```

---

## 3. Komponen Vektor SVG Budaya Batak

### 3.1 `src/sections/Cover/RumahBolonGate.tsx`
Komponen gerbang pembuka berupa fasad siluet Rumah Bolon Batak Toba yang terbelah di sumbu simetri:

```tsx
import React from 'react';

interface RumahBolonGateProps {
  leftRef: React.RefObject<HTMLDivElement | null>;
  rightRef: React.RefObject<HTMLDivElement | null>;
}

export const RumahBolonGate: React.FC<RumahBolonGateProps> = ({ leftRef, rightRef }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex"
      aria-hidden="true"
    >
      {/* Pendaran Cahaya Hangat di Tengah */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] rounded-full bg-radial from-amber-600/15 via-red-900/10 to-transparent blur-3xl" />
      </div>

      {/* BILAH KIRI (Fasad Rumah Bolon Sisi Kiri) */}
      <div
        ref={leftRef}
        className="w-1/2 h-full relative overflow-hidden bg-night flex items-center justify-end border-r border-gold/70 shadow-[6px_0_28px_rgba(0,0,0,0.7)]"
      >
        <div className="absolute inset-0 bg-night/95" />

        <div className="relative z-20 h-[50vh] sm:h-[62vh] max-h-[420px] sm:max-h-[560px] w-auto flex items-center justify-end -translate-y-6 sm:-translate-y-8 pr-[1px]">
          <svg
            viewBox="0 0 240 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-auto drop-shadow-[0_4px_16px_rgba(217,180,94,0.35)]"
          >
            {/* Atap Pelana Melengkung Kiri Khas Rumah Bolon */}
            <path
              d="M240,40 C190,45 80,110 10,210 C4,218 0,228 0,238 C0,246 6,252 14,250 C70,235 170,210 240,195 Z"
              fill="url(#left-roof-gradient)"
              stroke="#D9B45E"
              strokeWidth="2.5"
            />
            {/* Ujung Tanduk Atap Runcing */}
            <path d="M0,238 C-5,225 5,200 25,185 C20,198 12,215 10,235 Z" fill="#9B2C24" />

            {/* Papan Ornamen Gorga (Dorpi / Tomok) */}
            <path d="M70,225 L240,200 L240,320 L95,320 Z" fill="#1A120E" stroke="#B8924A" strokeWidth="1.5" />

            {/* Pola Garis & Segitiga Ipon-ipon pada Fasad Kiri */}
            <path d="M100,240 L240,220" stroke="#9B2C24" strokeWidth="3" />
            <path d="M110,255 L240,235" stroke="#D9B45E" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M120,270 L240,250" stroke="#F6F1EA" strokeWidth="2" />
            <path d="M130,285 L240,265" stroke="#9B2C24" strokeWidth="2.5" />
            <path d="M140,300 L240,280" stroke="#D9B45E" strokeWidth="1.5" />

            {/* Tiang Penopang Kayu Utama (Tiang Bumbungan) */}
            <rect x="210" y="320" width="30" height="150" fill="#221612" stroke="#B8924A" strokeWidth="1.5" />
            <rect x="130" y="320" width="22" height="150" fill="#1C120E" stroke="#B8924A" strokeWidth="1" />

            {/* Tangga Masuk Tradisional */}
            <path d="M180,430 L240,430 L240,470 L180,470 Z" fill="#9B2C24" opacity="0.8" />
            <line x1="180" y1="445" x2="240" y2="445" stroke="#D9B45E" strokeWidth="1.5" />
            <line x1="180" y1="460" x2="240" y2="460" stroke="#D9B45E" strokeWidth="1.5" />

            {/* Gradien Warna Atap Kiri */}
            <defs>
              <linearGradient id="left-roof-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9B2C24" />
                <stop offset="60%" stopColor="#2E1C16" />
                <stop offset="100%" stopColor="#15100E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* BILAH KANAN (Fasad Rumah Bolon Sisi Kanan) */}
      <div
        ref={rightRef}
        className="w-1/2 h-full relative overflow-hidden bg-night flex items-center justify-start border-l border-gold/70 shadow-[-6px_0_28px_rgba(0,0,0,0.7)]"
      >
        <div className="absolute inset-0 bg-night/95" />

        <div className="relative z-20 h-[50vh] sm:h-[62vh] max-h-[420px] sm:max-h-[560px] w-auto flex items-center justify-start -translate-y-6 sm:-translate-y-8 pl-[1px]">
          <svg
            viewBox="0 0 240 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-auto drop-shadow-[0_4px_16px_rgba(217,180,94,0.35)]"
          >
            {/* Atap Pelana Melengkung Kanan Khas Rumah Bolon (Mirror) */}
            <path
              d="M0,40 C50,45 160,110 230,210 C236,218 240,228 240,238 C240,246 234,252 226,250 C170,235 70,210 0,195 Z"
              fill="url(#right-roof-gradient)"
              stroke="#D9B45E"
              strokeWidth="2.5"
            />
            {/* Ujung Tanduk Atap Runcing */}
            <path d="M240,238 C245,225 235,200 215,185 C220,198 228,215 230,235 Z" fill="#9B2C24" />

            {/* Papan Ornamen Gorga Kanan */}
            <path d="M170,225 L0,200 L0,320 L145,320 Z" fill="#1A120E" stroke="#B8924A" strokeWidth="1.5" />

            {/* Pola Garis & Segitiga Ipon-ipon pada Fasad Kanan */}
            <path d="M140,240 L0,220" stroke="#9B2C24" strokeWidth="3" />
            <path d="M130,255 L0,235" stroke="#D9B45E" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M120,270 L0,250" stroke="#F6F1EA" strokeWidth="2" />
            <path d="M110,285 L0,265" stroke="#9B2C24" strokeWidth="2.5" />
            <path d="M100,300 L0,280" stroke="#D9B45E" strokeWidth="1.5" />

            {/* Tiang Penopang Kayu Utama Kanan */}
            <rect x="0" y="320" width="30" height="150" fill="#221612" stroke="#B8924A" strokeWidth="1.5" />
            <rect x="88" y="320" width="22" height="150" fill="#1C120E" stroke="#B8924A" strokeWidth="1" />

            {/* Tangga Masuk Tradisional Kanan */}
            <path d="M0,430 L60,430 L60,470 L0,470 Z" fill="#9B2C24" opacity="0.8" />
            <line x1="0" y1="445" x2="60" y2="445" stroke="#D9B45E" strokeWidth="1.5" />
            <line x1="0" y1="460" x2="60" y2="460" stroke="#D9B45E" strokeWidth="1.5" />

            {/* Gradien Warna Atap Kanan */}
            <defs>
              <linearGradient id="right-roof-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#9B2C24" />
                <stop offset="60%" stopColor="#2E1C16" />
                <stop offset="100%" stopColor="#15100E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};
```

### 3.2 `src/components/decor/GorgaWatermark.tsx`
Watermark geometris berbasis pola berulang SVG Gorga Ipon-ipon (sebagai pengganti KawungWatermark):

```tsx
import React from 'react';

interface GorgaWatermarkProps {
  variant?: 'light' | 'dark';
  className?: string;
  opacity?: number;
}

export const GorgaWatermark: React.FC<GorgaWatermarkProps> = ({
  variant = 'light',
  className = '',
  opacity,
}) => {
  const strokeColor = variant === 'dark' ? '#D9B45E' : '#B8924A';
  const defaultOpacity = variant === 'dark' ? 0.08 : 0.05;
  const appliedOpacity = opacity !== undefined ? opacity : defaultOpacity;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      style={{ opacity: appliedOpacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`gorga-pattern-${variant}`}
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Pola Geometris Ipon-ipon (Segitiga Belah Ketupat Berjejer) */}
            <path
              d="M0,30 L15,15 L30,30 L45,15 L60,30 L45,45 L30,30 L15,45 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
            />
            {/* Titik Mata Pusat Keharmonisan */}
            <circle cx="30" cy="30" r="2.5" fill={strokeColor} />
            <circle cx="0" cy="30" r="1.5" fill={strokeColor} />
            <circle cx="60" cy="30" r="1.5" fill={strokeColor} />
            <circle cx="30" cy="0" r="1.5" fill={strokeColor} />
            <circle cx="30" cy="60" r="1.5" fill={strokeColor} />
            {/* Garis Hairline diagonal pendukung */}
            <path d="M0,0 L60,60 M60,0 L0,60" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gorga-pattern-${variant})`} />
      </svg>
    </div>
  );
};
```

### 3.3 `src/components/decor/CornerOrnament.tsx`
Ornamen sudut bingkai SVG motif Gorga Ipon-ipon:

```tsx
import React from 'react';

interface CornerOrnamentProps {
  size?: number;
  className?: string;
  opacity?: number;
  variant?: 'gold' | 'gorga';
}

export const CornerOrnament: React.FC<CornerOrnamentProps> = ({
  size = 48,
  className = '',
  opacity = 0.75,
  variant = 'gold',
}) => {
  const mainStroke = variant === 'gorga' ? '#9B2C24' : '#B8924A';
  const accentStroke = variant === 'gorga' ? '#D9B45E' : '#9B2C24';

  const CornerSVG = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* Garis Sudut Siku 90 Derajat */}
      <path d="M2,46 L2,2 L46,2" stroke={mainStroke} strokeWidth="1.5" />
      <path d="M6,42 L6,6 L42,6" stroke={accentStroke} strokeWidth="0.8" strokeDasharray="3 2" />
      
      {/* Motif Ipon-ipon Segitiga Batak di Sudut */}
      <path d="M2,2 L14,14 L2,26 Z" fill={mainStroke} opacity="0.3" stroke={mainStroke} strokeWidth="1" />
      <path d="M2,2 L26,2 L14,14 Z" fill={mainStroke} opacity="0.3" stroke={mainStroke} strokeWidth="1" />
      <circle cx="10" cy="10" r="2" fill={accentStroke} />
    </svg>
  );

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute top-2 left-2">
        <CornerSVG />
      </div>
      <div className="absolute top-2 right-2 -scale-x-100">
        <CornerSVG />
      </div>
      <div className="absolute bottom-2 left-2 -scale-y-100">
        <CornerSVG />
      </div>
      <div className="absolute bottom-2 right-2 -scale-x-100 -scale-y-100">
        <CornerSVG />
      </div>
    </div>
  );
};
```

### 3.4 `src/components/decor/Divider.tsx`
Pemisah garis hairline dengan aksen geometris Batak di tengah:

```tsx
import React from 'react';

interface DividerProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ variant = 'light', className = '' }) => {
  const isDark = variant === 'dark';
  const lineColor = isDark ? 'from-transparent via-gold/50 to-transparent' : 'from-transparent via-gold/45 to-transparent';
  const dotBorder = isDark ? 'border-gold-bright bg-gold/40' : 'border-gold bg-gold/30';

  return (
    <div
      className={`flex items-center justify-center gap-2.5 w-full max-w-[240px] mx-auto select-none ${className}`}
      aria-hidden="true"
    >
      <span className={`h-[1px] flex-1 bg-gradient-to-r ${lineColor}`} />
      
      {/* Aksen Tiga Segitiga Ipon-ipon Tengah */}
      <span className="w-1.5 h-1.5 rotate-45 bg-gorga/70" />
      <span className={`w-2.5 h-2.5 rotate-45 border ${dotBorder}`} />
      <span className="w-1.5 h-1.5 rotate-45 bg-gorga/70" />
      
      <span className={`h-[1px] flex-1 bg-gradient-to-l ${lineColor}`} />
    </div>
  );
};
```

### 3.5 `src/components/decor/GorgaBackground.tsx`
Latar belakang global redup di luar kartu undangan (menggantikan BatikBackground):

```tsx
import React from 'react';

interface GorgaBackgroundProps {
  opacity?: number;
  className?: string;
}

export const GorgaBackground: React.FC<GorgaBackgroundProps> = ({
  opacity = 0.22,
  className = '',
}) => {
  return (
    <aside
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#0E0A09] ${className}`}
    >
      {/* Gradasi Radial Panggung Malam */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1C120E] via-[#0E0A09] to-[#070504]" />

      {/* Siluet Geometris Sulur Gorga Berulang */}
      <div
        className="absolute inset-0 bg-repeat mix-blend-screen"
        style={{
          opacity,
          backgroundImage: `radial-gradient(#B8924A 0.8px, transparent 0.8px), radial-gradient(#9B2C24 0.6px, transparent 0.6px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />
    </aside>
  );
};
```

### 3.6 `src/components/ui/PhotoFrame.tsx`
Bingkai foto potret berbentuk siluet atap lengkung pelana Rumah Bolon:

```tsx
import React from 'react';

interface PhotoFrameProps {
  src: string;
  alt: string;
  aspectRatio?: 'portrait' | 'square';
  className?: string;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  alt,
  aspectRatio = 'portrait',
  className = '',
}) => {
  return (
    <div className={`relative p-2.5 bg-gradient-to-b from-[#FFFDF9] to-[#F4EEE6] border border-gold/40 rounded-t-[48px] rounded-b-xs shadow-[0_4px_20px_rgba(43,30,26,0.1)] select-none ${className}`}>
      {/* Garis Border Ganda Khas Rumah Bolon */}
      <div className="relative overflow-hidden rounded-t-[42px] rounded-b-xs border border-gold/60 p-1">
        <div className={`relative overflow-hidden rounded-t-[38px] rounded-b-xs ${aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
      
      {/* Aksen Puncak Atap Runcing Mini */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-gold bg-[#FFFDF9]" />
    </div>
  );
};
```

### 3.7 `src/components/ui/CouplePortrait.tsx`
Potret mempelai bebas-card dengan panel Ulos geometris sebagai cultural shadow companion:

```tsx
import React, { useState } from 'react';

interface CouplePortraitProps {
  src: string;
  alt: string;
  label?: string;
  companionSide?: 'left' | 'right';
  align?: 'left' | 'right' | 'center';
  className?: string;
}

export const CouplePortrait: React.FC<CouplePortraitProps> = ({
  src,
  alt,
  label,
  companionSide = 'right',
  align = 'center',
  className = '',
}) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const alignContainerClass =
    align === 'left'
      ? 'items-start sm:items-start'
      : align === 'right'
        ? 'items-end sm:items-end'
        : 'items-center';

  return (
    <figure className={`relative flex flex-col select-none ${alignContainerClass} ${className}`}>
      <div className="relative w-64 sm:w-72 h-80 sm:h-92 flex items-end">
        {/* PANEL ULOS GEOMETRIS PENDAMPING (CULTURAL SHADOW COMPANION) */}
        <div
          className={`absolute bottom-4 z-0 pointer-events-none transition-transform duration-1000 ease-out ${
            companionSide === 'right'
              ? '-right-3 sm:-right-6 translate-x-2'
              : '-left-3 sm:-left-6 -translate-x-2'
          }`}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 100 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-68 sm:h-76 w-auto opacity-35 filter drop-shadow-[0_2px_8px_rgba(155,44,36,0.25)] select-none pointer-events-none"
          >
            {/* Panel Tenun Ulos Bergaris Vertikal */}
            <rect x="10" y="10" width="80" height="280" rx="2" fill="#1C120E" stroke="#B8924A" strokeWidth="1" />
            <line x1="25" y1="10" x2="25" y2="290" stroke="#9B2C24" strokeWidth="4" />
            <line x1="38" y1="10" x2="38" y2="290" stroke="#D9B45E" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="50" y1="10" x2="50" y2="290" stroke="#F6F1EA" strokeWidth="3" />
            <line x1="62" y1="10" x2="62" y2="290" stroke="#D9B45E" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="75" y1="10" x2="75" y2="290" stroke="#9B2C24" strokeWidth="4" />
            
            {/* Rumbai-rumbai Ulos Bawah (Sirat / Rambu) */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={i} x1={15 + i * 8} y1="290" x2={15 + i * 8} y2="315" stroke="#B8924A" strokeWidth="1.2" />
            ))}
          </svg>
        </div>

        {/* AKSEN BINTANG GORGA 4 SUDUT FLOATING */}
        <div
          className={`absolute -top-2 ${companionSide === 'right' ? 'right-2' : 'left-2'} w-4 h-4 text-gorga/60 animate-pulse pointer-events-none`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
          </svg>
        </div>

        {/* FOTO POTRET DENGAN SOFT GRADIENT MASKING */}
        {!hasError ? (
          <div
            className="relative z-10 w-full h-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%)',
            }}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              onError={() => setHasError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6 bg-surface-alt/40 border border-line rounded-xs">
            <p className="font-display text-xs text-gorga uppercase tracking-widest font-semibold">
              {label || 'Foto Mempelai'}
            </p>
            <p className="font-body text-[11px] text-ink-muted/80 mt-1 italic">
              [Menunggu foto resmi]
            </p>
          </div>
        )}
      </div>

      {/* HAIRLINE PEMISAH DENGAN AKSEN TRIPLE BELAH KETUPAT */}
      <div
        className={`w-52 sm:w-60 flex items-center gap-2 mt-2 mb-4 ${
          align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'
        }`}
        aria-hidden="true"
      >
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <span className="w-1 h-1 rotate-45 bg-gorga/70" />
        <span className="w-1.5 h-1.5 rotate-45 border border-gold bg-gold/40" />
        <span className="w-1 h-1 rotate-45 bg-gorga/70" />
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/50 to-transparent" />
      </div>
    </figure>
  );
};
```

---

## 4. Penyesuaian Seluruh Section

### 4.1 `src/sections/Cover/index.tsx`
- Ganti import `GununganGate` menjadi `import { RumahBolonGate } from './RumahBolonGate';`.
- Ubah tombol Buka Undangan menjadi aksen merah Gorga berwibawa:
  `bg-gradient-to-r from-gorga via-[#B8382E] to-gorga hover:from-[#B8382E] hover:to-gorga text-[#FFFDF9] border border-gold shadow-[0_4px_20px_rgba(155,44,36,0.4)]`.
- Gunakan `<CornerOrnament size={48} opacity={0.7} />`.

### 4.2 `src/sections/Hero.tsx`
- Ganti watermark Kawung menjadi `<GorgaWatermark variant="light" />`.
- Tampilkan salam: `{config.greeting.traditional}` (*"Horas Ma Di Hita Saluhutna"*).
- Header menyertakan siluet atap Rumah Bolon mini di atas tanggal.

### 4.3 `src/sections/Couple.tsx`
- Tampilkan nama lengkap dengan marga dipertegas:
  `{config.couple.groom.fullName}` dan `{config.couple.bride.fullName}`.
- Tampilkan nama orang tua terhormat: Ayah dan Ibu (Ibu dengan format marga *br. Nainggolan*, *br. Hutapea*).
- Gunakan `<CouplePortrait />` dengan companion panel Ulos yang baru.

### 4.4 `src/sections/Events.tsx`
- Render 3 agenda dari `config.events`:
  1. **Ikat Janji Pranikah (Martumpol)**
  2. **Pemberkatan Kudus Pernikahan**
  3. **Pesta Adat Na Gok & Resepsi**
- Setiap kartu memiliki tombol *"Buka di Google Maps"* (`target="_blank" rel="noopener noreferrer"`).
- Ganti ornamen sudut menjadi `CornerOrnament` dan `GorgaWatermark`.

### 4.5 `src/sections/Doa.tsx` (Ayat Firman Tuhan)
- Nuansa gelap (`bg-night text-on-night`).
- Tampilkan kutipan Alkitab dari `config.quote.translation` dan sumber `config.quote.verse` (*1 Korintus 13:4, 7-8a*).
- **HAPUS** elemen font Arab dan blok kaligrafi Arab. Gantikan dengan header siluet atap Rumah Bolon emas.

### 4.6 `src/sections/LoveStory.tsx`, `Gallery`, `Gift`, `Rsvp`, `Closing`
- Ganti setiap kemunculan `KawungWatermark` dengan `GorgaWatermark`.
- Pada `Gift`, nomor rekening menampilkan data rekening bank Jos & Zeni. Tombol salin nomor rekening memicu Toast notifikasi.
- Pada `Closing.tsx`, tampilkan ucapan terima kasih keluarga besar Panjaitan & Rumahombar.

#### 4.6.1 Opsi Desain Galeri Foto (Layout 1, Layout 2, Layout 3, & Layout 4)
Sistem galeri menyediakan 4 varian layout modular yang tersimpan di repositori untuk dipilih oleh pemilik undangan (tanpa menampilkan tombol pengalih kepada tamu):

- **Layout 1: Klasik Berbingkai (`GalleryLayout1.tsx`)**
  - **Karakteristik**: Grid seragam 2-kolom (`grid-cols-2`) dengan rasio aspek 4:5.
  - **Estetika**: Garis bingkai emas tipis (`border border-gold/40`), ornamen ukiran sudut Gorga (`CornerOrnament size={20}`), dan latar kartu krem gading `#F4EEE6`.
  - **Interaksi**: Hover scale 105% dengan ikon kaca pembesar pop-up dan integrasi Lightbox 8 foto.

- **Layout 2: Modern Frameless Editorial Mosaic (`GalleryLayout2.tsx`)**
  - **Karakteristik**: Tata letak asimetris dinamis tanpa bingkai (*100% frameless*), tanpa garis border, tanpa ornamen sudut, dan **murni tanpa teks/kata-kata yang menutupi foto**.
  - **Ritme Visual**: Hero spotlight lebar penuh, asymmetric staggered duo, cinematic sunset horizon, modular duo grid, dan finale romantic duo.
  - **Estetika**: Sudut lengkung organik `rounded-2xl`, *soft ambient elevation shadow*, foto tampil 100% jernih dan murni (keterangan foto tersaji di dalam Lightbox pop-up saat foto disentuh).
  - **Interaksi**: Micro-scale lembut 1.04x dan integrasi Lightbox modal layar penuh.

- **Layout 3: Large Portrait Showcase (`GalleryLayout3.tsx`)**
  - **Karakteristik**: Foto berukuran besar berdiri megah (*grand single portrait showcase*, `aspect-[3/4]`, `max-w-[320px] sm:max-w-[370px]`) serupa dengan gaya foto profil kedua mempelai di bagian *Couple*.
  - **Estetika**: 100% Frameless (*border-0*), *soft gradient masking* bawah meluruh lembut ke latar kertas krem (`#FBF8F3`), *feathered inner vignette*, aksen bintang Gorga 4-sudut, dan *hairline divider* pemisah beraksen triple belah ketupat.

- **Layout 4: 3D Movie Poster Infinite Carousel (`GalleryLayout4.tsx`) — AKTIF SAAT INI**
  - **Karakteristik**: Karusel 3D bergaya Coverflow / Poster Film dengan foto utama di tengah (`aspect-[2/3]`) serta foto sebelumnya dan selanjutnya terlihat mengintip di belakang kiri dan kanan dengan perspektif kedalaman 3D (*depth perspective*).
  - **Infinite Loop / Scroll Tanpa Batas**: Dapat digeser tanpa batas dengan rotasi siklik modulo 8 foto.
  - **Dynamic Ambient Blurred Background**: Saat tamu menggeser dan berhenti di suatu foto, latar belakang galeri otomatis berganti mengikuti warna dan nuansa foto tersebut dengan gradasi tipis di bagian atas, kiri, dan kanan yang meluruh halus (*soft feathered masking*) menyatu ke dalam latar halaman utama (`#FBF8F3`).
  - **Interaksi Multi-Input**: Mendukung *touch swipe* (geser jari di layar HP), *mouse drag* di desktop, tombol panah melingkar, dan indikator pill dinamis.
  - **100% Frameless & Murni Fotografi**: Mengetuk foto tengah akan membuka Lightbox layar penuh beresolusi tinggi.

- **Konfigurasi Layout Aktif (`src/sections/Gallery/index.tsx`)**:
  - Pilihan layout dikontrol secara internal via konstanta:
    ```typescript
    export const ACTIVE_GALLERY_LAYOUT: GalleryLayoutVariant = 'layout-4'; // 'layout-1' | 'layout-2' | 'layout-3' | 'layout-4'
    ```
  - **Tanpa Tombol di Frontend**: Tamu undangan tidak melihat tombol pilihan layout, sehingga tampilan tetap bersih, sakral, dan sesuai pilihan kurasi yang ditetapkan.

### 4.7 `src/App.tsx`
- Sinkronisasi `document.title` menjadi:
  `The Wedding of ${groom.shortName} & ${bride.shortName} — Undangan Pernikahan Adat Batak Toba`.
- Gunakan `<GorgaBackground opacity={0.22} />` di root layout.

---

## 5. Konfigurasi `index.html`

Perbarui `index.html` agar tidak memuat font Arab (`Amiri`), hanya memuat `Cinzel` dan `Plus Jakarta Sans`:

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <title>The Wedding of Daniel & Ruth — Undangan Pernikahan Adat Batak</title>
    <meta name="description" content="Undangan Pernikahan Adat Batak Toba Modern — Daniel & Ruth" />

    <!-- Google Fonts Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="bg-bg text-ink antialiased selection:bg-gorga/20 selection:text-ink">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 6. Adapter Penyimpanan RSVP (`src/lib/storageAdapter.ts`)

Perbarui storage key menjadi `batak_wedding_rsvp_v1`:

```typescript
const STORAGE_KEY = 'batak_wedding_rsvp_v1';

export const INITIAL_WISHES = [
  {
    id: 'w-1',
    name: 'Kel. Bpk. St. J. Simanjuntak',
    attendance: 'present',
    guestCount: 2,
    message: 'Horas ma di hamu nadua! Kiranya Tuhan Yesus senantiasa memberkati perjalanan rumah tangga Daniel & Ruth. Menjadi keluarga yang takut akan Tuhan.',
    createdAt: '2026-11-20T10:15:00.000Z',
  },
  {
    id: 'w-2',
    name: 'Kel. Bpk. Ir. R. Siregar',
    attendance: 'present',
    guestCount: 4,
    message: 'Selamat memasuki bahtera rumah tangga yang kudus. Seia sekata dan bahagia sampai marurat marbulung marparbue jala marpinompar. Horas!',
    createdAt: '2026-11-22T14:30:00.000Z',
  },
  {
    id: 'w-3',
    name: 'Rian & Jessica Silalahi',
    attendance: 'present',
    guestCount: 2,
    message: 'Happy wedding bro Daniel & Ruth! Semoga cinta dan damai sejahtera Kristus selalu menyertai kalian berdua.',
    createdAt: '2026-11-25T08:00:00.000Z',
  },
];
```

---

## 7. Checklist Urutan Pengerjaan

Ketika mengeksekusi blueprint ini di repositori baru:

1. [ ] **Tahap 1**: Salin `src/config/wedding.config.ts` dan `src/lib/storageAdapter.ts`.
2. [ ] **Tahap 2**: Salin token warna di `src/styles/tokens.css` dan `@theme` di `src/styles/index.css`.
3. [ ] **Tahap 3**: Buat seluruh komponen SVG budaya Batak di `src/sections/Cover/RumahBolonGate.tsx`, `src/components/decor/GorgaWatermark.tsx`, `CornerOrnament.tsx`, `Divider.tsx`, `GorgaBackground.tsx`, `PhotoFrame.tsx`, dan `CouplePortrait.tsx`.
4. [ ] **Tahap 4**: Perbarui seksi `Cover`, `Hero`, `Couple`, `Events`, `Doa`, `LoveStory`, `Gallery`, `Gift`, `Rsvp`, `Closing`, dan `App.tsx`.
5. [ ] **Tahap 5**: Perbarui `index.html` (font & meta description).
6. [ ] **Tahap 6**: Jalankan validasi:
   ```bash
   npm run lint
   npm run build
   ```
   Pastikan menghasilkan **0 errors, 0 warnings** dan bundle berhasil di-compile.
