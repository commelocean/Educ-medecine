'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Reponse = 'OUI' | 'NON'

interface DiagnosticState {
  // P-07 — Q01..Q40
  reponses: Record<string, Reponse>
  setReponse: (questionId: string, reponse: Reponse) => void

  // P-08 — emploi du temps (Q41..Q45c)
  emploiDuTemps: Record<string, string>
  setEdt: (key: string, value: string) => void

  // P-09 — dates examens (ISO YYYY-MM-DD)
  datesExamens: string[]
  addDateExamen: (date: string) => void
  removeDateExamen: (date: string) => void

  volumeChapitresJour: string
  setVolume: (v: string) => void
  dureeTransport: string
  setTransport: (v: string) => void

  // P-10 — bulletin (base64 non persisté : trop volumineux pour localStorage)
  bulletinBase64: string | null
  bulletinFilename: string | null
  setBulletin: (base64: string | null, filename: string | null) => void

  reset: () => void
}

const initial = {
  reponses: {},
  emploiDuTemps: {},
  datesExamens: [] as string[],
  volumeChapitresJour: '',
  dureeTransport: '',
  bulletinBase64: null,
  bulletinFilename: null,
}

export const useDiagnosticStore = create<DiagnosticState>()(
  persist(
    (set) => ({
      ...initial,
      setReponse: (questionId, reponse) =>
        set((s) => ({ reponses: { ...s.reponses, [questionId]: reponse } })),
      setEdt: (key, value) =>
        set((s) => ({ emploiDuTemps: { ...s.emploiDuTemps, [key]: value } })),
      addDateExamen: (date) =>
        set((s) =>
          s.datesExamens.includes(date)
            ? s
            : { datesExamens: [...s.datesExamens, date].sort() }
        ),
      removeDateExamen: (date) =>
        set((s) => ({ datesExamens: s.datesExamens.filter((d) => d !== date) })),
      setVolume: (volumeChapitresJour) => set({ volumeChapitresJour }),
      setTransport: (dureeTransport) => set({ dureeTransport }),
      setBulletin: (bulletinBase64, bulletinFilename) =>
        set({ bulletinBase64, bulletinFilename }),
      reset: () => set(initial),
    }),
    {
      name: 'diagnostic-draft',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        reponses: s.reponses,
        emploiDuTemps: s.emploiDuTemps,
        datesExamens: s.datesExamens,
        volumeChapitresJour: s.volumeChapitresJour,
        dureeTransport: s.dureeTransport,
        bulletinFilename: s.bulletinFilename,
      }),
    }
  )
)
