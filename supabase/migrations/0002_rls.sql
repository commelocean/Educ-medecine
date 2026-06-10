-- Activation du RLS sur les 10 tables + policies minimales.
-- Principe : un élève authentifié n'accède qu'à ses propres données,
-- identifié par la correspondance email Supabase Auth ↔ eleves.email.
-- Le service role (utilisé par n8n et le back-office serveur) bypasse le RLS.

ALTER TABLE public.eleves                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaires         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reponses_questionnaire ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profils                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plannings              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planning_creneaux      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions_j             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulletins              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulletin_trimestres    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulletin_matieres      ENABLE ROW LEVEL SECURITY;

-- Helper : id de l'élève correspondant à l'utilisateur connecté
CREATE OR REPLACE FUNCTION public.current_eleve_id()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.eleves WHERE email = auth.jwt() ->> 'email' LIMIT 1;
$$;

-- eleves : lecture de sa propre ligne uniquement
CREATE POLICY eleves_select_own ON public.eleves
  FOR SELECT TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- questionnaires
CREATE POLICY questionnaires_select_own ON public.questionnaires
  FOR SELECT TO authenticated
  USING (eleve_id = public.current_eleve_id());

-- reponses_questionnaire
CREATE POLICY reponses_select_own ON public.reponses_questionnaire
  FOR SELECT TO authenticated
  USING (questionnaire_id IN (
    SELECT id FROM public.questionnaires WHERE eleve_id = public.current_eleve_id()
  ));

-- profils
CREATE POLICY profils_select_own ON public.profils
  FOR SELECT TO authenticated
  USING (questionnaire_id IN (
    SELECT id FROM public.questionnaires WHERE eleve_id = public.current_eleve_id()
  ));

-- plannings
CREATE POLICY plannings_select_own ON public.plannings
  FOR SELECT TO authenticated
  USING (questionnaire_id IN (
    SELECT id FROM public.questionnaires WHERE eleve_id = public.current_eleve_id()
  ));

-- planning_creneaux
CREATE POLICY creneaux_select_own ON public.planning_creneaux
  FOR SELECT TO authenticated
  USING (planning_id IN (
    SELECT p.id FROM public.plannings p
    JOIN public.questionnaires q ON q.id = p.questionnaire_id
    WHERE q.eleve_id = public.current_eleve_id()
  ));

-- sessions_j
CREATE POLICY sessions_select_own ON public.sessions_j
  FOR SELECT TO authenticated
  USING (planning_id IN (
    SELECT p.id FROM public.plannings p
    JOIN public.questionnaires q ON q.id = p.questionnaire_id
    WHERE q.eleve_id = public.current_eleve_id()
  ));

-- bulletins
CREATE POLICY bulletins_select_own ON public.bulletins
  FOR SELECT TO authenticated
  USING (eleve_id = public.current_eleve_id());

-- bulletin_trimestres
CREATE POLICY trimestres_select_own ON public.bulletin_trimestres
  FOR SELECT TO authenticated
  USING (bulletin_id IN (
    SELECT id FROM public.bulletins WHERE eleve_id = public.current_eleve_id()
  ));

-- bulletin_matieres
CREATE POLICY matieres_select_own ON public.bulletin_matieres
  FOR SELECT TO authenticated
  USING (trimestre_id IN (
    SELECT t.id FROM public.bulletin_trimestres t
    JOIN public.bulletins b ON b.id = t.bulletin_id
    WHERE b.eleve_id = public.current_eleve_id()
  ));

-- NOTE back-office : les pages /admin doivent à terme passer par le serveur
-- (service role) ou par des policies dédiées sur un claim role=admin :
--   USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
-- À ajouter sur chaque table si l'admin reste côté client.
