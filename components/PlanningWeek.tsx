'use client'

import type { PlanningCreneau } from '@/lib/types'

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const TYPE_STYLE: Record<string, string> = {
  cours:     'bg-blue-100 border-blue-300 text-blue-800',
  revision:  'bg-indigo-100 border-indigo-300 text-indigo-800',
  sport:     'bg-green-100 border-green-300 text-green-800',
  loisirs:   'bg-yellow-100 border-yellow-300 text-yellow-800',
  sommeil:   'bg-gray-100 border-gray-200 text-gray-600',
  repas:     'bg-orange-100 border-orange-300 text-orange-800',
  transport: 'bg-pink-100 border-pink-300 text-pink-800',
  physio:    'bg-purple-100 border-purple-300 text-purple-800',
}

const TYPE_EMOJI: Record<string, string> = {
  cours: '🏫', revision: '📚', sport: '🏋️', loisirs: '🎨',
  sommeil: '💤', repas: '🍽️', transport: '🚌', physio: '🧘'
}

interface Props { creneaux: PlanningCreneau[] }

export function PlanningWeek({ creneaux }: Props) {
  const byDay: Record<string, PlanningCreneau[]> = {}
  for (const jour of JOURS) {
    const entries = creneaux
      .filter(c => c.jour?.toLowerCase() === jour.toLowerCase())
      .sort((a, b) => a.horaire.localeCompare(b.horaire))
    if (entries.length) byDay[jour] = entries
  }
  const activeDays = JOURS.filter(j => byDay[j])

  if (activeDays.length === 0) {
    return <p className="text-gray-400 text-sm text-center py-8">Aucun créneau disponible.</p>
  }

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${activeDays.length}, minmax(130px, 1fr))` }}
      >
        {activeDays.map(jour => (
          <div key={jour}>
            <div className="text-center font-bold text-xs text-gray-500 uppercase tracking-wider mb-2 pb-1 border-b border-gray-100">
              {jour}
            </div>
            <div className="space-y-1.5">
              {byDay[jour].map(c => (
                <div
                  key={c.id}
                  className={`rounded-lg border px-2 py-1.5 text-xs ${TYPE_STYLE[c.type] ?? 'bg-gray-50 border-gray-200 text-gray-700'}`}
                >
                  <div className="font-bold">{TYPE_EMOJI[c.type]} {c.horaire}</div>
                  <div className="opacity-80 mt-0.5 truncate">{c.activite}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
