import { useEffect } from "react";
import { AppContextProvider, useAppContext } from "./context/AppContext";
import { Cover } from "./sections/Cover";
import { MusicToggle } from "./components/layout/MusicToggle";
import { BottomNav } from "./components/layout/BottomNav";
import { MainNavbar } from "./components/layout/MainNavbar";
import { MainFooter } from "./components/layout/MainFooter";
import { Hero } from "./sections/Hero";
import { Couple } from "./sections/Couple";
import { Events } from "./sections/Events";
import { Doa } from "./sections/Doa";
import { LoveStory } from "./sections/LoveStory";
import { Gallery } from "./sections/Gallery";
import { GuestMoments } from "./sections/GuestMoments";
import { Gift } from "./sections/Gift";
import { Rsvp } from "./sections/Rsvp";
import { Closing } from "./sections/Closing";
import { CornerOrnament } from "./components/decor/CornerOrnament";
import { GorgaWatermark } from "./components/decor/GorgaWatermark";
import { GorgaFlourishWatermark } from "./components/decor/GorgaFlourishWatermark";
import { GorgaBackground } from "./components/decor/GorgaBackground";

function MainLayout() {
  const { config } = useAppContext();

  // Sinkronisasi dinamis document.title dengan nama kedua mempelai
  useEffect(() => {
    const { groom, bride } = config.couple;
    document.title = `The Wedding of ${groom.shortName} & ${bride.shortName}`;
  }, [config.couple]);

  return (
    <div className="min-h-screen text-on-night flex flex-col items-center justify-start relative selection:bg-gorga/20 selection:text-ink overflow-x-hidden">
      {/* LATAR BELAKANG GORGA BATAK GLOBAL REDUP (BINGKAI ATAS & BAWAH DI DESKTOP) */}
      <GorgaBackground opacity={0.55} />

      {/* COVER PANGGUNG RUMAH BOLON SPLIT-GATE */}
      <Cover />

      {/* FLOATING AUDIO CONTROLLER (KANAN BAWAH) */}
      <MusicToggle />

      {/* FLOATING BOTTOM NAVIGATION (TENGAH BAWAH) */}
      <BottomNav />

      {/* STRUKTUR KOLOM UTAMA HALAMAN UNDANGAN (SEAMLESS FULL BLEED DI HP & ELEGAN DI DESKTOP) */}
      <div className="w-full max-w-xl mx-auto px-0 relative z-20 min-h-screen">
        <main
          id="main-content"
          tabIndex={-1}
          className="relative bg-bg-main text-ink shadow-[0_10px_50px_rgba(0,0,0,0.5)] border-x border-line overflow-hidden focus-visible:outline-none"
        >
          {/* 1. NAVBAR DENGAN MOTIF KAIN ULOS BATAK (STICKY DI SISI ATAS CARD) */}
          <MainNavbar />

          {/* ORNAMEN UKIRAN SUDUT GORGA (POSISI OFFSET AGAR TIDAK TABRAKAN DENGAN NAVBAR & FOOTER) */}
          <CornerOrnament size={44} opacity={0.65} topOffset="5rem" bottomOffset="21rem" />

          {/* TEKSTUR WATERMARK GORGA IPON-IPON DI LATAR BELAKANG KERTAS GADING */}
          <GorgaWatermark variant="light" opacity={0.02} />

          {/* WATERMARK SULUR BATIK GORGA EMAS DI LATAR BELAKANG KERTAS GADING */}
          <GorgaFlourishWatermark opacity={0.05} />

          {/* SECTION 1: HERO & COUNTDOWN */}
          <Hero />

          {/* SECTION 2: PROFIL KEDUA MEMPELAI */}
          <Couple />

          {/* SECTION 3: RANGKAIAN ACARA (MARTUMPOL, PEMBERKATAN HKBP, PESTA ADAT NA GOK) */}
          <Events />

          {/* SECTION 4: AYAT FIRMAN TUHAN & JANJI SUCI */}
          <Doa />

          {/* SECTION 5: KISAH PERJALANAN CINTA */}
          <LoveStory />

          {/* SECTION 6: GALERI FOTO & LIGHTBOX */}
          <Gallery />

          {/* SECTION 7: MOMEN KESERUAN TAMU DI HARI-H */}
          <GuestMoments />

          {/* SECTION 8: TANDA KASIH & AMPLOP DIGITAL */}
          <Gift />

          {/* SECTION 8: KONFIRMASI KEHADIRAN & BUKU TAMU */}
          <Rsvp />

          {/* SECTION 9: PENUTUP & UCAPAN TERIMA KASIH */}
          <Closing />

          {/* 2. FOOTER DENGAN MOTIF KAIN ULOS BATAK (DI BAGIAN DASAR CARD) */}
          <MainFooter />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppContextProvider>
      <MainLayout />
    </AppContextProvider>
  );
}
