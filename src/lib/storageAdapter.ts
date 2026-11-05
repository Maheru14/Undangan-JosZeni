import { supabase, isSupabaseConfigured } from './supabaseClient';

export type AttendanceStatus = 'hadir' | 'berhalangan';

export interface RsvpEntry {
  id: string;
  name: string;
  attendance: AttendanceStatus;
  guestCount: number;
  message: string;
  createdAt: string; // ISO date string
  isDummy?: boolean;
}

export interface RsvpStorageAdapter {
  getAll(): Promise<RsvpEntry[]>;
  save(entry: Omit<RsvpEntry, 'id' | 'createdAt'>): Promise<RsvpEntry>;
  subscribe?(
    onNewEntry: (entry: RsvpEntry) => void,
    onDeleteEntry?: (id: string) => void,
  ): () => void;
}

const STORAGE_KEY = 'wedding_wishes_clean_v1';

export const INITIAL_DUMMY_DATA: RsvpEntry[] = [];

export const INITIAL_WISHES = INITIAL_DUMMY_DATA;

/**
 * Membersihkan data dami lama dari browser pengguna secara otomatis.
 */
function cleanupLegacyStorage() {
  if (typeof window === 'undefined') return;
  try {
    const legacyKeys = [
      'batak_wedding_rsvp_v1',
      'batak_wedding_rsvp_v2',
      'wedding_rsvp',
      'batak_wedding_rsvp',
    ];
    for (const key of legacyKeys) {
      window.localStorage.removeItem(key);
    }
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const k = window.localStorage.key(i);
      if (k && (k.startsWith('batak_wedding_') || k.includes('rsvp_v'))) {
        window.localStorage.removeItem(k);
      }
    }
  } catch {
    // Ignore error in restricted browser environment
  }
}

// Jalankan pembersihan saat modul dimuat
cleanupLegacyStorage();

/**
 * Filter keamanan ekstra untuk memastikan ucapan dami lama tidak pernah muncul
 */
function isDummyEntry(item: RsvpEntry): boolean {
  if (!item || item.isDummy) return true;
  const name = (item.name || '').toLowerCase().trim();
  const msg = (item.message || '').toLowerCase().trim();
  return (
    msg.includes('daniel & ruth') ||
    name === 'contoh nama' ||
    name === 'dummy user'
  );
}

/**
 * Implementasi LocalStorage Adapter (Digunakan jika Supabase belum aktif atau offline)
 */
export class LocalStorageRsvpAdapter implements RsvpStorageAdapter {
  private inMemoryFallback: RsvpEntry[] = [];

  async getAll(): Promise<RsvpEntry[]> {
    if (typeof window === 'undefined') {
      return this.inMemoryFallback.filter((item) => !isDummyEntry(item));
    }

    try {
      cleanupLegacyStorage();

      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as RsvpEntry[];
      return Array.isArray(parsed) ? parsed.filter((item) => !isDummyEntry(item)) : [];
    } catch {
      return this.inMemoryFallback.filter((item) => !isDummyEntry(item));
    }
  }

  async save(entry: Omit<RsvpEntry, 'id' | 'createdAt'>): Promise<RsvpEntry> {
    const newEntry: RsvpEntry = {
      ...entry,
      id: `rsvp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      isDummy: false,
    };

    if (typeof window === 'undefined') {
      this.inMemoryFallback = [newEntry, ...this.inMemoryFallback];
      return newEntry;
    }

    try {
      const currentList = await this.getAll();
      const updatedList = [newEntry, ...currentList];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return newEntry;
    } catch {
      this.inMemoryFallback = [newEntry, ...this.inMemoryFallback];
      return newEntry;
    }
  }
}

/**
 * Implementasi Supabase Adapter dengan dukungan Realtime
 */
export class SupabaseRsvpAdapter implements RsvpStorageAdapter {
  private localFallback = new LocalStorageRsvpAdapter();

  async getAll(): Promise<RsvpEntry[]> {
    if (!supabase) {
      return this.localFallback.getAll();
    }

    try {
      const { data, error } = await supabase
        .from('rsvp_wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('Gagal memuat ucapan dari Supabase, beralih ke cache lokal:', error);
        return this.localFallback.getAll();
      }

      return data
        .map((row) => ({
          id: String(row.id),
          name: row.name as string,
          attendance: row.attendance as AttendanceStatus,
          guestCount: row.attendance === 'hadir' ? 1 : 0,
          message: row.message as string,
          createdAt: row.created_at as string,
          isDummy: false,
        }))
        .filter((item) => !isDummyEntry(item));
    } catch (err) {
      console.warn('Error saat menghubungi Supabase:', err);
      return this.localFallback.getAll();
    }
  }

  async save(entry: Omit<RsvpEntry, 'id' | 'createdAt'>): Promise<RsvpEntry> {
    if (!supabase) {
      return this.localFallback.save(entry);
    }

    try {
      const { data, error } = await supabase
        .from('rsvp_wishes')
        .insert({
          name: entry.name,
          attendance: entry.attendance,
          message: entry.message,
        })
        .select()
        .single();

      if (error || !data) {
        console.warn('Gagal menyimpan ke Supabase, menyimpan ke lokal:', error);
        return this.localFallback.save(entry);
      }

      return {
        id: String(data.id),
        name: data.name as string,
        attendance: data.attendance as AttendanceStatus,
        guestCount: data.attendance === 'hadir' ? 1 : 0,
        message: data.message as string,
        createdAt: data.created_at as string,
        isDummy: false,
      };
    } catch (err) {
      console.warn('Error saat menyimpan ke Supabase:', err);
      return this.localFallback.save(entry);
    }
  }

  subscribe(onNewEntry: (entry: RsvpEntry) => void, onDeleteEntry?: (id: string) => void): () => void {
    if (!supabase) return () => {};

    const channel = supabase
      .channel('realtime:rsvp_wishes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'rsvp_wishes' },
        (payload) => {
          const row = payload.new as {
            id: string | number;
            name: string;
            attendance: string;
            message: string;
            created_at: string;
          };
          if (!row) return;

          const newEntry: RsvpEntry = {
            id: String(row.id),
            name: row.name,
            attendance: row.attendance as AttendanceStatus,
            guestCount: row.attendance === 'hadir' ? 1 : 0,
            message: row.message,
            createdAt: row.created_at,
            isDummy: false,
          };

          if (!isDummyEntry(newEntry)) {
            onNewEntry(newEntry);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'rsvp_wishes' },
        (payload) => {
          if (payload.old && payload.old.id && onDeleteEntry) {
            onDeleteEntry(String(payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      void supabase?.removeChannel(channel);
    };
  }
}

export const rsvpStorage: RsvpStorageAdapter = isSupabaseConfigured
  ? new SupabaseRsvpAdapter()
  : new LocalStorageRsvpAdapter();

