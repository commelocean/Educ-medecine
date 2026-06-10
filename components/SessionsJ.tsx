'use client'

import { useMemo, useState } from 'react'
import type { SessionJ, TypeSessionJ } from '@/lib/types'
import { COULEURS_J } from '@/lib/constants'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const TYPES_J: TypeSessionJ[] = ['J0', 'J1', 'J7', 'J14', 'J30', 'J60']

export default function SessionsJ({ sessions }: { sessions: SessionJ[] }) {
  const [matiere, setMatiere] = useState('')
  const [semaine, setSemaine] = useState('')

  const matieres = useMemo(
    () => Array.from(new Set(sessions.map((s) => s.matiere))).sort(),
    [sessions]
  )

  const semaines = useMemo(() => {
    const set = new Set<string>()
    for (const s of sessions) {
      const d = new Date(s.date_session + 'T00:00:00')
      const lundi = new Date(d)
      lundi.setDate(d.getDate() - ((d.getDay() + 6) % 7))
      set.add(lundi.toISOString().slice(0, 10))
    }
    return Array.from(set).sort()
  }, [sessions])

  const filtered = useMemo(() => {
    return sessions
      .filter((s) => !matiere || s.matiere === matiere)
      .filter((s) => {
        if (!semaine) return true
        const d = new Date(s.date_session + 'T00:00:00')
        const lundi = new Date(d)
        lundi.setDate(d.getDate() - ((d.getDay() + 6) % 7))
        return lundi.toISOString().slice(0, 10) === semaine
      })
      .sort((a, b) => a.date_session.localeCompare(b.date_session))
  }, [sessions, matiere, semaine])

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          {TYPES_J.map((t) => (
            <Badge key={t} style={{ backgroundColor: COULEURS_J[t] }} className="text-gray-700">
              {t}
            </Badge>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <Select
            aria-label="Filtrer par matière"
            className="h-9 w-auto"
            value={matiere}
            onChange={(e) => setMatiere(e.target.value)}
          >
            <option value="">Toutes matières</option>
            {matieres.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </Select>
          <Select
            aria-label="Filtrer par semaine"
            className="h-9 w-auto"
            value={semaine}
            onChange={(e) => setSemaine(e.target.value)}
          >
            <option value="">Toutes semaines</option>
            {semaines.map((s) => (
              <option key={s} value={s}>
                Sem. du {new Date(s + 'T00:00:00').toLocaleDateString('fr-FR')}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Matière</th>
              <th className="px-4 py-3">Durée</th>
              <th className="px-4 py-3">Techniques</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((s) => (
              <tr key={s.id}>
                <td className="whitespace-nowrap px-4 py-2.5 text-gray-700">
                  {new Date(s.date_session + 'T00:00:00').toLocaleDateString('fr-FR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </td>
                <td className="px-4 py-2.5">
                  <Badge style={{ backgroundColor: COULEURS_J[s.type_j] }} className="text-gray-700">
                    {s.type_j}
                  </Badge>
                </td>
                <td className="px-4 py-2.5 font-medium text-gray-900">{s.matiere}</td>
                <td className="whitespace-nowrap px-4 py-2.5 text-gray-600">
                  {s.duree_min ? `${s.duree_min} min` : '—'}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(s.techniques_vak) ? s.techniques_vak : []).map((t, i) => (
                      <span key={i} className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                        {String(t)}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  Aucune session ne correspond à ces filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
