'use client'

import { useParams } from 'next/navigation'
import { useQuestionnaire } from '@/lib/useQuestionnaire'
import SessionsJ from '@/components/SessionsJ'
import { Chargement, Introuvable } from '@/components/EtatChargement'

export default function CalendrierPage() {
  const { id } = useParams<{ id: string }>()
  const { data: q, loading } = useQuestionnaire(id)

  if (loading) return <Chargement />
  if (!q) return <Introuvable />

  const sessions = q.plannings?.[0]?.sessions_j ?? []

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Calendrier de répétition espacée</h1>
      <p className="mt-1 text-sm text-gray-600">
        Méthode des J : chaque chapitre est revu à J0, J1, J7, J14, J30 et J60.
      </p>

      {sessions.length === 0 ? (
        <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          ⏳ Vos sessions sont en cours de génération.
        </p>
      ) : (
        <div className="mt-6">
          <SessionsJ sessions={sessions} />
        </div>
      )}
    </div>
  )
}
