import initialGuestsData from '../config/initialGuests.json' with { type: 'json' };
import type { GuestEntry, GuestValidationResult } from '../types/guest';

const CACHE_KEY = 'joszeni_wedding_guests_v2';
const SPREADSHEET_ID = '1ReKZ99qiD0JIcy1i8VuRnlC_D6OaM0BCIdkYwcMFG8A';
const GID = '653394673';

const initialGuests: GuestEntry[] = initialGuestsData as GuestEntry[];

/**
 * Membersihkan parameter mentah dari URL:
 * - Mengganti tanda '+' dengan spasi
 * - Decode URI Component
 * - Menghapus karakter tak terlihat (seperti \u200E dari WhatsApp)
 * - Menghapus tag HTML dan merapikan spasi berlebih
 */
export function cleanRawParam(param: string | null | undefined): string {
  if (!param) return '';
  try {
    const decoded = decodeURIComponent(param.replace(/\+/g, ' ')).trim();
    return decoded
      .replace(/[\u200B-\u200D\u200E\u200F\uFEFF]/g, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  } catch {
    return String(param)
      .replace(/[\u200B-\u200D\u200E\u200F\uFEFF]/g, '')
      .trim();
  }
}

/**
 * Menormalisasi string untuk perbandingan fleksibel:
 * lowercase, tanpa spasi ganda, dan karakter non-alfanumerik umum dinormalkan.
 */
export function normalizeForCompare(str: string): string {
  return cleanRawParam(str)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Mengambil daftar tamu yang tersimpan di LocalStorage atau fallback ke daftar awal (initialGuests).
 */
export function getStoredGuestList(): GuestEntry[] {
  if (typeof window === 'undefined') return initialGuests;

  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { timestamp: number; guests: GuestEntry[] };
      if (Array.isArray(parsed.guests) && parsed.guests.length > 0) {
        return parsed.guests;
      }
    }
  } catch {
    // Abaikan jika localStorage tidak dapat diakses
  }

  return initialGuests;
}

/**
 * Menyimpan daftar tamu terbaru ke LocalStorage untuk akses instan berikutnya.
 */
export function saveGuestsToCache(guests: GuestEntry[]): void {
  if (typeof window === 'undefined' || !Array.isArray(guests) || guests.length === 0) return;
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        guests,
      }),
    );
  } catch {
    // Kuota localStorage penuh atau private browsing
  }
}

interface GvizCell {
  v?: string | number | null;
  f?: string | null;
}

interface GvizRow {
  c: (GvizCell | null)[];
}

interface GvizResponse {
  table?: {
    rows?: GvizRow[];
  };
}

/**
 * Parsing data respon Google Visualization API menjadi array GuestEntry
 */
function parseGvizResponse(data: GvizResponse): GuestEntry[] {
  const rows = data?.table?.rows;
  if (!Array.isArray(rows) || rows.length < 3) return [];

  const guests: GuestEntry[] = [];

  for (let r = 2; r < rows.length; r++) {
    const cells = rows[r]?.c;
    if (!cells) continue;

    // Setiap blok kategori memiliki 3 kolom: [quota, name, link]
    for (let c = 3; c < cells.length; c += 3) {
      const quotaCell = cells[c];
      const nameCell = cells[c + 1];
      const linkCell = cells[c + 2];

      let name = '';
      if (nameCell && (nameCell.f || nameCell.v)) {
        name = String(nameCell.f || nameCell.v).trim();
      }

      let link = '';
      if (linkCell && linkCell.v) {
        link = String(linkCell.v).trim();
      }

      let param = '';
      if (link.includes('to=')) {
        try {
          const u = new URL(link);
          param = u.searchParams.get('to') || '';
        } catch {
          const parts = link.split('to=');
          param = decodeURIComponent((parts[1] || '').split('&')[0].replace(/\+/g, ' '));
        }
      }

      const finalName = cleanRawParam(name || param);
      if (!finalName) continue;

      let quota = 1;
      if (quotaCell && (quotaCell.v !== undefined || quotaCell.f !== undefined)) {
        const rawQuota = String(quotaCell.v ?? quotaCell.f ?? '1');
        const parsed = parseInt(rawQuota, 10);
        if (!isNaN(parsed) && parsed > 0) quota = parsed;
      }

      guests.push({
        name: finalName,
        slug: cleanRawParam(param || finalName),
        quota,
      });
    }
  }

  return guests;
}

/**
 * Melakukan sinkronisasi data live dari Google Sheets via JSONP (bebas CORS).
 */
export function fetchLiveGuestList(): Promise<GuestEntry[]> {
  if (typeof window === 'undefined') return Promise.resolve(initialGuests);

  return new Promise((resolve) => {
    const callbackName = `gviz_cb_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const script = document.createElement('script');

    const cleanup = () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      try {
        delete (window as unknown as Record<string, unknown>)[callbackName];
      } catch {
        (window as unknown as Record<string, unknown>)[callbackName] = undefined;
      }
    };

    // Timeout pengaman 6 detik (jika jaringan sangat lambat)
    const timer = setTimeout(() => {
      cleanup();
      resolve(getStoredGuestList());
    }, 6000);

    (window as unknown as Record<string, unknown>)[callbackName] = (data: GvizResponse) => {
      clearTimeout(timer);
      cleanup();
      try {
        const parsed = parseGvizResponse(data);
        if (parsed.length > 0) {
          saveGuestsToCache(parsed);
          resolve(parsed);
          return;
        }
      } catch {
        // Fallback
      }
      resolve(getStoredGuestList());
    };

    script.src = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=responseHandler:${callbackName}&gid=${GID}`;
    script.onerror = () => {
      clearTimeout(timer);
      cleanup();
      resolve(getStoredGuestList());
    };

    document.head.appendChild(script);
  });
}

/**
 * Mencari tamu di dalam daftar menggunakan algoritma pencocokan fleksibel:
 * 1. Pencocokan nama / slug persis (case-insensitive)
 * 2. Pencocokan dengan tanda hubung diganti spasi (contoh: 'pak-aris' vs 'pak aris')
 */
export function findGuestInList(rawParam: string, list: GuestEntry[]): GuestEntry | null {
  const norm = normalizeForCompare(rawParam);
  if (!norm) return null;

  const normWithSpaces = norm.replace(/[-_]+/g, ' ');

  for (const guest of list) {
    const guestNormName = normalizeForCompare(guest.name);
    const guestNormSlug = normalizeForCompare(guest.slug);

    if (guestNormName === norm || guestNormSlug === norm) {
      return guest;
    }

    if (
      guestNormName === normWithSpaces ||
      guestNormSlug === normWithSpaces ||
      guestNormName.replace(/[-_]+/g, ' ') === normWithSpaces
    ) {
      return guest;
    }
  }

  return null;
}

/**
 * Memvalidasi status tamu berdasarkan query parameter URL dan daftar tamu.
 *
 * Logika 3 Kondisi:
 * 1. Tanpa parameter ?to= (domain utama joszeni.my.id) -> 'general' (Bisa isi RSVP, cover "Tamu Undangan")
 * 2. Parameter ?to= ADA di daftar Google Sheets -> 'verified' (Bisa isi RSVP, cover nama resmi)
 * 3. Parameter ?to= TIDAK ADA di Google Sheets -> 'unregistered' (TIDAK BISA isi RSVP, cover fallback ke "Tamu Undangan")
 */
export function validateGuest(
  rawParam: string | null | undefined,
  customList?: GuestEntry[],
): GuestValidationResult {
  const cleaned = cleanRawParam(rawParam);

  // KONDISI 1: Link umum / general tanpa parameter ?to= atau ?to=Tamu Undangan
  if (!cleaned || normalizeForCompare(cleaned) === 'tamu undangan') {
    return {
      status: 'general',
      name: 'Tamu Undangan',
      quota: 1,
      isRsvpAllowed: true,
    };
  }

  const list = customList ?? getStoredGuestList();
  const matched = findGuestInList(cleaned, list);

  // KONDISI 2: Link khusus resmi yang terdaftar di Google Sheets
  if (matched) {
    return {
      status: 'verified',
      name: matched.name,
      quota: matched.quota,
      isRsvpAllowed: true,
      category: matched.category,
    };
  }

  // KONDISI 3: Link dengan nama yang diedit/tidak ada di daftar Google Sheets
  // Nama di cover di-fallback ke "Tamu Undangan" (nama editan dibuang), dan RSVP dikunci!
  return {
    status: 'unregistered',
    name: 'Tamu Undangan',
    quota: 1,
    isRsvpAllowed: false,
    rawInput: cleaned,
  };
}
