'use client'

import type { PlanningCreneau } from '@/lib/types'
import { COULEUR_CRENEAU } from '@/lib/constants'

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const TYPE_EMOJI: Record<string, string> = {
  cours: '📚',
  revision: '✍️',
  sport: '🏃',
  loisirs: '🎮',
  sommeil: '😴',
  repas: '🍽️',
  transport: '🚇',
  physio: '🧘',
}

function normaliseJour(jour: string): string {
  const j = jour.toLowerCase()
  return JOURS.find((J) => J.toLowerCase().startsWith(j.slice(0, 3))) ?? jour
}

export default function PlanningWeek({ creneaux }: { creneaux: PlanningCreneau[] }) {
  const parJour = new Map<string, PlanningCreneau[]>()
  for (const c of creneaux) {
    const jour = normaliseJour(c.jour)
    if (!parJour.has(jour)) parJour.set(jour, [])
    parJour.get(jour)!.push(c)
  }
  parJour.forEach((list) => list.sort((a, b) => (a.horaire || '').localeCompare(b.horaire || '')))

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {JOURS.map((jour) => (
        <div key={jour} className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-3 py-2 text-sm font-semibold text-gray-900">
            {jour}
          </div>
          <div className="space-y-1.5 p-2">
            {(parJour.get(jour) ?? []).map((c) => (
              <div
                key={c.id}
                className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs"
                style={{ backgroundColor: c.couleur || COULEUR_CRENEAU }}
              >
                <div className="font-medium text-gray-800">
                  {TYPE_EMOJI[c.type] ?? '•'} {c.activite}
                </div>
                <div className="text-gray-500">{c.horaire}</div>
              </div>
            ))}
            {!parJour.get(jour)?.length && (
              <p className="px-1 py-2 text-xs text-gray-400">—</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
