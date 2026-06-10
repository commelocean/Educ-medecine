'use client'

import { createClient } from '@/lib/supabase/client'
import type { Eleve, Questionnaire, Profil, Planning, PlanningCreneau, SessionJ } from './types'

export interface QuestionnaireComplet extends Questionnaire {
  eleves: Eleve
  profils: Profil[]
  plannings: (Planning & {
    planning_creneaux: PlanningCreneau[]
    sessions_j: SessionJ[]
  })[]
}

export async function fetchQuestionnaireComplet(
  id: string
): Promise<QuestionnaireComplet | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('questionnaires')
    .select(
      '*, eleves(*), profils(*), plannings(*, planning_creneaux(*), sessions_j(*))'
    )
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('fetchQuestionnaireComplet', error)
    return null
  }
  return data as QuestionnaireComplet | null
}

export interface BulletinComplet {
  id: string
  classe?: string
  eleve_nom_bulletin?: string
  source_filename?: string
  created_at: string
  bulletin_trimestres: {
    id: string
    periode: string
    moyenne_generale?: number
    appreciation_globale?: string
    bulletin_matieres: {
      id: string
      nom?: string
      matiere?: string
      moyenne?: number
      commentaire?: string
    }[]
  }[]
}

export async function fetchBulletins(questionnaireId: string): Promise<BulletinComplet[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('bulletins')
    .select('*, bulletin_trimestres(*, bulletin_matieres(*))')
    .eq('questionnaire_id', questionnaireId)

  if (error) {
    console.error('fetchBulletins', error)
    return []
  }
  return (data ?? []) as BulletinComplet[]
}
