# Médecine Top 7% — Diagnostic neuropédagogique PASS / L.AS

Application Next.js 14 (App Router, TypeScript, Tailwind CSS) articulée avec le workflow n8n
existant (`n8n-formation.isao.io`) et la base Supabase `gbycqybfkkxcbpvqohne`.

## Parcours (MVP — lot 1)

| Page | Route |
|------|-------|
| P-05 Auth (Supabase, consentement parental mineurs) | `/auth` |
| P-06 Onboarding | `/onboarding` |
| P-07 Questionnaire 48 questions (sauvegarde auto localStorage) | `/diagnostic/questions` |
| P-08 Emploi du temps | `/diagnostic/emploi-du-temps` |
| P-09 Dates d'examens (date picker, ISO uniquement) | `/diagnostic/examens` |
| P-10 Bulletin PDF ≤ 5 Mo (optionnel) | `/diagnostic/bulletin` |
| P-11 Récapitulatif | `/diagnostic/recap` |
| P-12 Traitement (polling `generated_at` toutes les 3 s, timeout 3 min) | `/diagnostic/traitement` |
| P-13 Dashboard élève | `/eleve/[questionnaire_id]` |
| P-14 Rapport profil (radar + barres VAK avec références nationales) | `/eleve/[id]/profil` |
| P-15 Semaine type | `/eleve/[id]/planning/semaine` |
| P-16 Calendrier sessions J (filtres matière / semaine) | `/eleve/[id]/planning/calendrier` |
| P-17 Bulletin structuré | `/eleve/[id]/bulletin` |
| P-20 Liste élèves admin (filtres profil / canal / statut) | `/admin/eleves` |
| P-21 Fiche élève admin | `/admin/eleves/[id]` |

## Intégration n8n

La soumission passe exclusivement par le Route Handler serveur
`app/api/diagnostic/submit/route.ts`, qui :
1. vérifie l'authentification Supabase,
2. valide les 40 réponses et les dates ISO,
3. construit le payload JSON du contrat (`eleve`, `reponses`, `emploi_du_temps`,
   `dates_examens`, `volume_chapitres_jour`, `duree_transport`, `bulletin_base64`, `source_mode`),
4. POSTe vers `N8N_WEBHOOK_URL` avec l'en-tête `x-webhook-secret`,
5. renvoie `questionnaire_id` au front qui redirige vers `/diagnostic/traitement`.

## Démarrage

```bash
cp .env.example .env.local   # renseigner les clés
npm install
npm run dev
```

## Sécurité — avant mise en production

- Appliquer les migrations `supabase/migrations/` :
  - `0001_colonnes_mineurs.sql` — colonnes `parent_email`, `consentement_parental_at`
  - `0002_rls.sql` — **activation du RLS + policies** sur les 10 tables
    (⚠️ vérifier d'abord que n8n écrit bien via la clé service role, sinon ses
    insertions seront bloquées)
- Les pages `/admin` utilisent un garde client (`NEXT_PUBLIC_ADMIN_EMAILS` ou claim
  `app_metadata.role=admin`) ; la protection des données repose sur le RLS.
- Aucune clé n'est versionnée : tout passe par `.env.local` (gitignoré).
