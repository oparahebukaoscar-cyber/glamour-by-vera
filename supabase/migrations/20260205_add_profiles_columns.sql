-- Add expected profile columns used by the app
alter table public.profiles
  add column if not exists full_name text,
  add column if not exists username text,
  add column if not exists website text,
  add column if not exists avatar_url text,
  add column if not exists role text,
  add column if not exists updated_at timestamptz;
