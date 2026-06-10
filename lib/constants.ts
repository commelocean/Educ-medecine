import type { TypeSessionJ } from './types'

// Code couleur planning — cahier des charges (ne pas modifier)
export const COULEURS_J: Record<TypeSessionJ, string> = {
  J0: '#D9E1F2',
  J1: '#FFF2CC',
  J7: '#E2EFDA',
  J14: '#FCE4D6',
  J30: '#E1D5E7',
  J60: '#E1D5E7',
}

export const COULEUR_CRENEAU = '#F2F2F2'

// Références nationales pour la superposition graphique (P-14)
export const MOYENNE_NATIONALE_IDENTITE: Record<string, number> = {
  Perfectionniste: 22,
  Aimable: 18,
  'Émotionnel': 16,
  Intellectuel: 14,
  Enthousiaste: 13,
  Dynamique: 10,
  Rebelle: 7,
}

export const REFERENCE_NATIONALE_VAK: Record<string, number> = {
  Visuel: 58,
  Auditif: 27,
  Kinesthesique: 15,
}

export const VAK_COLORS: Record<string, string> = {
  Visuel: '#06B6D4',
  Auditif: '#7C3AED',
  Kinesthesique: '#14B8A6',
}

export const DUREE_ESTIMEE = 'Environ 15-20 minutes'

export const BULLETIN_MAX_BYTES = 5 * 1024 * 1024
