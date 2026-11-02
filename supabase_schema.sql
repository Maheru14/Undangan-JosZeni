-- ==============================================================================
-- SCHEMA SUPABASE: UNDANGAN PERNIKAHAN MODERN (BATAK)
-- Fitur:
-- 1. Buku Doa & Ucapan (RSVP Wishes) + Realtime
-- 2. Live Guest Moments (Foto Keseruan Tamu Hari-H) + Supabase Storage + Realtime
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. TABEL: rsvp_wishes (Buku Doa, Ucapan & Konfirmasi Kehadiran)
-- ------------------------------------------------------------------------------
create table if not exists public.rsvp_wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  attendance text not null check (attendance in ('hadir', 'berhalangan')),
  message text not null,
  created_at timestamptz default now() not null
);

-- Index untuk mempercepat pengurutan ucapan terbaru
create index if not exists idx_rsvp_wishes_created_at on public.rsvp_wishes (created_at desc);

-- Aktifkan Row Level Security (RLS)
alter table public.rsvp_wishes enable row level security;

-- Policy: Semua tamu boleh membaca ucapan
create policy "Allow public read access to rsvp_wishes"
  on public.rsvp_wishes for select
  using (true);

-- Policy: Semua tamu boleh mengirim ucapan
create policy "Allow public insert to rsvp_wishes"
  on public.rsvp_wishes for insert
  with check (true);

-- Aktifkan Realtime untuk tabel rsvp_wishes
alter publication supabase_realtime add table public.rsvp_wishes;


-- ------------------------------------------------------------------------------
-- 2. TABEL: guest_moments (Foto Momen Keseruan Tamu Hari-H)
-- ------------------------------------------------------------------------------
create table if not exists public.guest_moments (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  image_url text not null,
  caption text default '',
  created_at timestamptz default now() not null
);

-- Index pengurutan foto momen terbaru
create index if not exists idx_guest_moments_created_at on public.guest_moments (created_at desc);

-- Aktifkan Row Level Security (RLS)
alter table public.guest_moments enable row level security;

-- Policy: Semua tamu boleh melihat foto momen
create policy "Allow public read access to guest_moments"
  on public.guest_moments for select
  using (true);

-- Policy: Semua tamu boleh mengunggah foto momen
create policy "Allow public insert to guest_moments"
  on public.guest_moments for insert
  with check (true);

-- Aktifkan Realtime untuk tabel guest_moments
alter publication supabase_realtime add table public.guest_moments;


-- ------------------------------------------------------------------------------
-- 3. STORAGE BUCKET: guest_moments (Penyimpanan File Foto Tamu)
-- Maksimal ukuran: 5MB per foto
-- Format didukung: JPEG, PNG, WEBP, HEIC
-- ------------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'guest_moments',
  'guest_moments',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/jpg']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/jpg'];

-- Policy Storage: Siapa saja boleh melihat/mengakses foto publik
create policy "Allow public read on guest_moments bucket"
  on storage.objects for select
  using (bucket_id = 'guest_moments');

-- Policy Storage: Siapa saja boleh mengunggah foto ke bucket
create policy "Allow public upload to guest_moments bucket"
  on storage.objects for insert
  with check (bucket_id = 'guest_moments');
