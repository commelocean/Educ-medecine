'use client'

import { useParams } from 'next/navigation'
import { useQuestionnaire } from '@/lib/useQuestionnaire'
import PlanningWeek from '@/components/PlanningWeek'
import { Chargement, Introuvable } from '@/components/EtatChargement'

export default function PlanningSemainePage() {
  const { id } = useParams<{ id: string }>()
  const { data: q, loading } = useQuestionnaire(id)

  if (loading) return <Chargement />
  if (!q) return <Introuvable />

  const planning = q.plannings?.[0]
  const creneaux = planning?.planning_creneaux ?? []

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Votre semaine type</h1>
      <p className="mt-1 text-sm text-gray-600">
        Cours, révisions, sport, repas et sommeil — votre planning hebdomadaire optimisé.
      </p>

      {creneaux.length === 0 ? (
        <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          ⏳ Votre planning est en cours de génération.
        </p>
      ) : (
        <div className="mt-6">
          <PlanningWeek creneaux={creneaux} />
        </div>
      )}

      {planning?.notes_methodo && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-2 font-semibold text-gray-900">Notes méthodologiques</h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
            {planning.notes_methodo}
          </p>
        </div>
      )}
    </div>
  )
}
