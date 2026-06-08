export type ProfilIdentite = 'Perfectionniste' | 'Aimable' | 'Dynamique' | 'Rebelle' | 'Intellectuel' | 'Enthousiaste' | 'Émotionnel'
export type CanalVak = 'Visuel' | 'Auditif' | 'Kinesthesique'
export type TypeCreneau = 'cours' | 'revision' | 'sport' | 'loisirs' | 'sommeil' | 'repas' | 'transport' | 'physio'
export type TypeSessionJ = 'J0' | 'J1' | 'J7' | 'J14' | 'J30' | 'J60'

export interface Eleve {
  id: string
  prenom: string
  nom: string
  email: string
  date_naissance?: string
  created_at: string
}

export interface Questionnaire {
  id: string
  eleve_id: string
  identite_dominante?: ProfilIdentite
  identite_secondaire?: ProfilIdentite
  scores_identite_pct?: Record<string, number>
  canaux_vak_pct?: Record<string, number>
  canal_dominant?: CanalVak
  emploi_du_temps?: Record<string, string>
  dates_examens?: string[]
  volume_chapitres_jour?: string
  duree_transport?: string
  has_bulletin: boolean
  source_mode?: string
  submitted_at?: string
  generated_at: string
}

export interface Profil {
  id: string
  questionnaire_id: string
  motivation?: string
  synthese_narrative?: string
  conseil_strategique?: string
  preuves_bulletin?: unknown[]
  created_at: string
}

export interface Planning {
  id: string
  questionnaire_id: string
  examens_cibles: unknown[]
  notes_methodo?: string
  created_at: string
}

export interface PlanningCreneau {
  id: string
  planning_id: string
  jour: string
  horaire: string
  activite: string
  type: TypeCreneau
  couleur?: string
}

export interface SessionJ {
  id: string
  planning_id: string
  date_session: string
  type_j: TypeSessionJ
  matiere: string
  duree_min?: number
  couleur?: string
  techniques_vak: unknown[]
}

export interface EleveComplet extends Eleve {
  questionnaires: (Questionnaire & {
    profils: Profil[]
    plannings: (Planning & {
      planning_creneaux: PlanningCreneau[]
      sessions_j: SessionJ[]
    })[]
  })[]
}
