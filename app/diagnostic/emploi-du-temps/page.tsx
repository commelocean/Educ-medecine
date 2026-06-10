'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SCHEDULE_FIELDS } from '@/lib/questions'
import { useDiagnosticStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'

// Champs multi-jours : sélection par chips, valeurs jointes par ", "
const MULTI = new Set(['Q41', 'Q41a', 'Q41b', 'Q42', 'Q43'])

const GROUPES: { titre: string; ids: string[] }[] = [
  { titre: '📚 Cours académiques', ids: ['Q41', 'Q41a', 'Q41b'] },
  { titre: '🏃 Sport', ids: ['Q42', 'Q42a'] },
  { titre: '🎮 Loisirs / détente', ids: ['Q43', 'Q43a'] },
  { titre: '😴 Sommeil — semaine', ids: ['Q44a', 'Q44b'] },
  { titre: '🛌 Sommeil — week-end', ids: ['Q44c', 'Q44d'] },
  { titre: '🍽️ Repas', ids: ['Q45a', 'Q45b', 'Q45c'] },
]

export default function EmploiDuTempsPage() {
  const router = useRouter()
  const { emploiDuTemps, setEdt, volumeChapitresJour, setVolume, dureeTransport, setTransport } =
    useDiagnosticStore()
  const [showErrors, setShowErrors] = useState(false)

  const fields = Object.fromEntries(SCHEDULE_FIELDS.map((f) => [f.id, f]))

  function toggleDay(id: string, day: string) {
    const current = (emploiDuTemps[id] || '').split(', ').filter(Boolean)
    const next = current.includes(day) ? current.filter((d) => d !== day) : [...current, day]
    setEdt(id, next.join(', '))
  }

  const requis = ['Q41', 'Q44a', 'Q44b']
  const valide =
    requis.every((id) => emploiDuTemps[id]) && volumeChapitresJour !== '' && dureeTransport !== ''

  function next() {
    if (!valide) {
      setShowErrors(true)
      window.scrollTo({ top: 0 })
      return
    }
    router.push('/diagnostic/examens')
  }

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-gray-900">Votre emploi du temps</h1>
      <p className="mb-5 text-sm text-gray-600">
        Ces informations permettent de construire un planning réaliste autour de vos contraintes.
      </p>
      {showErrors && !valide && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          Veuillez renseigner au minimum : jours de cours, réveil et coucher en semaine, volume de
          chapitres et durée de transport.
        </p>
      )}

      <div className="space-y-5">
        {GROUPES.map((g) => (
          <Card key={g.titre}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{g.titre}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {g.ids.map((id) => {
                const f = fields[id]
                if (!f) return null
                const manquant = showErrors && requis.includes(id) && !emploiDuTemps[id]
                return (
                  <div key={id} className="space-y-1.5">
                    <Label htmlFor={id} className={cn(manquant && 'text-red-600')}>
                      {f.label}
                      {requis.includes(id) && ' *'}
                    </Label>
                    {MULTI.has(id) ? (
                      <div className="flex flex-wrap gap-2">
                        {f.options?.map((opt) => {
                          const selected = (emploiDuTemps[id] || '').split(', ').includes(opt)
                          return (
                            <button
                              key={opt}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => toggleDay(id, opt)}
                              className={cn(
                                'rounded-full border px-3 py-1.5 text-sm transition-colors',
                                selected
                                  ? 'border-indigo-600 bg-indigo-600 text-white'
                                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                              )}
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <Select
                        id={id}
                        value={emploiDuTemps[id] || ''}
                        onChange={(e) => setEdt(id, e.target.value)}
                      >
                        <option value="">— Choisir —</option>
                        {f.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </Select>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">📖 Charge de travail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="volume">Volume moyen de chapitres par jour *</Label>
              <Select id="volume" value={volumeChapitresJour} onChange={(e) => setVolume(e.target.value)}>
                <option value="">— Choisir —</option>
                {['1 cours', '2 cours', '3 cours', '4 cours ou plus'].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="transport">Durée quotidienne de transports *</Label>
              <Select id="transport" value={dureeTransport} onChange={(e) => setTransport(e.target.value)}>
                <option value="">— Choisir —</option>
                {['Moins de 30 min', '30 min à 1h', '1 à 2h', 'Plus de 2h'].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={() => router.push('/diagnostic/questions')}>
          ← Retour
        </Button>
        <Button onClick={next}>Dates d&apos;examens →</Button>
      </div>
    </div>
  )
}
