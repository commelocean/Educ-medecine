// Configuration publique de l'application.
//
// Ces valeurs sont PUBLIQUES par nature : la clé Supabase « anon » et les
// variables NEXT_PUBLIC_* sont de toute façon embarquées dans le bundle envoyé
// au navigateur. Les exposer ici n'introduit aucune faille — la vraie
// protection des données repose sur le RLS Supabase (à activer).
//
// Les variables d'environnement (Vercel / .env.local) restent PRIORITAIRES :
// si elles sont définies, elles écrasent ces valeurs par défaut. Ces fallbacks
// servent uniquement à garantir un déploiement fonctionnel même sans
// configuration d'environnement.

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://gbycqybfkkxcbpvqohne.supabase.co'

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdieWNxeWJma2t4Y2JwdnFvaG5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NjczNDQsImV4cCI6MjA5NjE0MzM0NH0.QwL51URle7Y922XxDyx6LHWjh-R7GqCLpYhXUMIydL4'

export const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? 'commelocean@yahoo.fr'
