'use client'

import { useParams } from 'next/navigation'
import { useQuestionnaire } from '@/lib/useQuestionnaire'
import RadarIdentite from '@/components/RadarIdentite'
import VakBars from '@/components/VakBars'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Chargement, Introuvable } from '@/components/EtatChargement'

export default function ProfilPage() {
  const { id } = useParams<{ id: string }>()
  const { data: q, loading } = useQuestionnaire(id)

  if (loading) return <Chargement />
  if (!q) return <Introuvable />

  const profil = q.profils?.[0]
  const preuves = Array.isArray(profil?.preuves_bulletin) ? profil.preuves_bulletin : []

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Votre rapport de profil</h1>
      <p className="mt-1 text-sm text-gray-600">
        Méthode J.-F. Michel — 7 profils d&apos;identité et canaux d&apos;apprentissage VAK.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profils d&apos;identité</CardTitle>
          </CardHeader>
          <CardContent>
            {q.scores_identite_pct ? (
              <RadarIdentite scores={q.scores_identite_pct} />
            ) : (
              <p className="py-12 text-center text-sm text-gray-500">Scores en cours de calcul…</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Canaux d&apos;apprentissage (VAK)</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {q.canaux_vak_pct ? (
              <VakBars scores={q.canaux_vak_pct} />
            ) : (
              <p className="py-12 text-center text-sm text-gray-500">Scores en cours de calcul…</p>
            )}
          </CardContent>
        </Card>
      </div>

      {!profil ? (
        <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          ⏳ Votre rapport narratif est en cours de rédaction. Revenez dans quelques instants.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {profil.motivation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">💪 Votre moteur de motivation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                  {profil.motivation}
                </p>
              </CardContent>
            </Card>
          )}
          {profil.synthese_narrative && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">🧠 Synthèse de votre profil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                  {profil.synthese_narrative}
                </p>
              </CardContent>
            </Card>
          )}
          {profil.conseil_strategique && (
            <Card className="border-indigo-200 bg-indigo-50">
              <CardHeader>
                <CardTitle className="text-base">🎯 Conseil stratégique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-sm leading-relaxed text-indigo-900">
                  {profil.conseil_strategique}
                </p>
              </CardContent>
            </Card>
          )}
          {preuves.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">📄 Preuves issues de votre bulletin</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {preuves.map((p, i) => (
                    <li key={i} className="rounded-lg bg-gray-50 px-4 py-2.5 text-sm text-gray-700">
                      {typeof p === 'string' ? p : JSON.stringify(p)}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
