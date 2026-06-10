-- Données de mineurs : consentement parental (RGPD)
ALTER TABLE public.eleves
  ADD COLUMN IF NOT EXISTS parent_email text,
  ADD COLUMN IF NOT EXISTS consentement_parental_at timestamptz;
