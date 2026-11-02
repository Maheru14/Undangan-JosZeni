import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface GuestMoment {
  id: string;
  guestName: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
}

export interface GuestMomentsAdapter {
  getAll(): Promise<GuestMoment[]>;
  upload(file: File, guestName: string, caption?: string): Promise<GuestMoment>;
  subscribe?(onNewMoment: (moment: GuestMoment) => void): () => void;
}

const LOCAL_STORAGE_MOMENTS_KEY = 'wedding_guest_moments_v1';

/**
 * Fallback Lokal jika Supabase belum aktif
 */
class LocalGuestMomentsAdapter implements GuestMomentsAdapter {
  private inMemory: GuestMoment[] = [];

  async getAll(): Promise<GuestMoment[]> {
    if (typeof window === 'undefined') return this.inMemory;
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_MOMENTS_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as GuestMoment[];
    } catch {
      return this.inMemory;
    }
  }

  async upload(file: File, guestName: string, caption?: string): Promise<GuestMoment> {
    const reader = new FileReader();
    const dataUrl = await new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    const newMoment: GuestMoment = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      guestName,
      imageUrl: dataUrl,
      caption: caption || '',
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      try {
        const current = await this.getAll();
        window.localStorage.setItem(LOCAL_STORAGE_MOMENTS_KEY, JSON.stringify([newMoment, ...current]));
      } catch {
        // storage quota fallback
      }
    }

    this.inMemory = [newMoment, ...this.inMemory];
    return newMoment;
  }
}

/**
 * Implementasi Supabase untuk Foto Momen Tamu (Storage Bucket + Realtime)
 */
class SupabaseGuestMomentsAdapter implements GuestMomentsAdapter {
  private localFallback = new LocalGuestMomentsAdapter();

  async getAll(): Promise<GuestMoment[]> {
    if (!supabase) return this.localFallback.getAll();

    try {
      const { data, error } = await supabase
        .from('guest_moments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('Gagal memuat foto momen dari Supabase:', error);
        return this.localFallback.getAll();
      }

      return data.map((row) => ({
        id: String(row.id),
        guestName: row.guest_name as string,
        imageUrl: row.image_url as string,
        caption: (row.caption || '') as string,
        createdAt: row.created_at as string,
      }));
    } catch (err) {
      console.warn('Error fetching guest moments:', err);
      return this.localFallback.getAll();
    }
  }

  async upload(file: File, guestName: string, caption?: string): Promise<GuestMoment> {
    if (!supabase) {
      return this.localFallback.upload(file, guestName, caption);
    }

    try {
      // 1. Bersihkan ekstensi dan buat nama file unik
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanFileName = `moment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const filePath = `uploads/${cleanFileName}`;

      // 2. Upload file ke Storage Bucket 'guest_moments'
      const { error: uploadError } = await supabase.storage
        .from('guest_moments')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // 3. Ambil URL Publik
      const { data: urlData } = supabase.storage
        .from('guest_moments')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // 4. Catat record ke tabel 'guest_moments'
      const { data: rowData, error: dbError } = await supabase
        .from('guest_moments')
        .insert({
          guest_name: guestName.trim(),
          image_url: publicUrl,
          caption: caption?.trim() || '',
        })
        .select()
        .single();

      if (dbError || !rowData) {
        throw dbError || new Error('Gagal mencatat metadata foto ke database');
      }

      return {
        id: String(rowData.id),
        guestName: rowData.guest_name as string,
        imageUrl: rowData.image_url as string,
        caption: (rowData.caption || '') as string,
        createdAt: rowData.created_at as string,
      };
    } catch (err) {
      console.warn('Gagal upload ke Supabase, fallback ke browser lokal:', err);
      return this.localFallback.upload(file, guestName, caption);
    }
  }

  subscribe(onNewMoment: (moment: GuestMoment) => void): () => void {
    if (!supabase) return () => {};

    const channel = supabase
      .channel('realtime:guest_moments')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guest_moments' },
        (payload) => {
          const row = payload.new as {
            id: string | number;
            guest_name: string;
            image_url: string;
            caption: string;
            created_at: string;
          };
          if (!row) return;

          onNewMoment({
            id: String(row.id),
            guestName: row.guest_name,
            imageUrl: row.image_url,
            caption: row.caption || '',
            createdAt: row.created_at,
          });
        }
      )
      .subscribe();

    return () => {
      void supabase?.removeChannel(channel);
    };
  }
}

export const guestMomentsStorage: GuestMomentsAdapter = isSupabaseConfigured
  ? new SupabaseGuestMomentsAdapter()
  : new LocalGuestMomentsAdapter();
