-- Migration: ensure orders table has required columns for frontend inserts
-- Adds customer/email/phone, total_price, status, created_at if missing

-- Ensure uuid extension exists (for id default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS customer_name text;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS customer_email text;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS customer_phone text;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS total_price numeric;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();

-- Ensure id column has default uuid if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='orders' AND column_name='id'
  ) THEN
    RAISE NOTICE 'orders.id does not exist; please create id column manually as needed.';
  ELSE
    -- try to set default if possible
    BEGIN
      ALTER TABLE public.orders ALTER COLUMN id SET DEFAULT uuid_generate_v4();
    EXCEPTION WHEN OTHERS THEN
      -- ignore errors setting default
    END;
  END IF;
END$$;
