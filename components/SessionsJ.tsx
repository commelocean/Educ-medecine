'use client'

import type { SessionJ } from '@/lib/types'

const SESSION_COLORS: Record<string, string> = {
  J0:  'bg-red-100 text-red-700 border-red-200',
  J1:  'bg-orange-100 text-orange-700 border-orange-200',
  J7:  'bg-amber-100 text-amber-700 border-amber-200',
  J14: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  J30: 'bg-green-100 text-green-700 border-green-200',
  J60: 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

interface Props { sessions: SessionJ[] }

export function SessionsJ({ sessions }: Props) {
  if (sessions.length === 0) {
    return <p className="text-gray-400 text-sm text-center py-8">Aucune session de révision programmée.</p>
  }

  const sorted = [...sessions].sort((a, b) => a.date_session.localeCompare(b.date_session))
  const grouped: Record<string, SessionJ[]> = {}
  for (const s of sorted) {
    if (!grouped[s.type_j]) grouped[s.type_j] = []
    grouped[s.type_j].push(s)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-2">
        {['J0', 'J1', 'J7', 'J14', 'J30', 'J60'].map(t => (
          grouped[t] ? (
            <span key={t} className={`text-xs font-bold px-3 py-1 rounded-full border ${SESSION_COLORS[t]}`}>
              {t} — {grouped[t].length} session{grouped[t].length > 1 ? 's' : ''}
            </span>
          ) : null
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs">
              <th className="text-left px-3 py-2 rounded-tl-lg">Type</th>
              <th className="text-left px-3 py-2">Date</th>
              <th className="text-left px-3 py-2">Matière</th>
              <th className="text-left px-3 py-2">Durée</th>
              <th className="text-left px-3 py-2 rounded-tr-lg">Techniques VAK</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sorted.map(s => (
              <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-3 py-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${SESSION_COLORS[s.type_j]}`}>
                    {s.type_j}
                  </span>
                </td>
                <td className="px-3 py-2 text-gray-600">
                  {new Date(s.date_session).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                </td>
                <td className="px-3 py-2 font-medium text-gray-800">{s.matiere}</td>
                <td className="px-3 py-2 text-gray-500">{s.duree_min ? `${s.duree_min} min` : '—'}</td>
                <td className="px-3 py-2">
                  {Array.isArray(s.techniques_vak) && s.techniques_vak.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {(s.techniques_vak as string[]).map((t, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  ) : <span className="text-gray-300">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
