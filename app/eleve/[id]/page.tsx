'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuestionnaire } from '@/lib/useQuestionnaire'
import { GROUPE_META } from '@/lib/questions'
import { COULEURS_J } from '@/lib/constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Chargement, Introuvable } from '@/components/EtatChargement'
import { cn } from '@/lib/utils'

export default function DashboardElevePage() {
  const { id } = useParams<{ id: string }>()
  const { data: q, loading } = useQuestionnaire(id)

  if (loading) return <Chargement />
  if (!q) return <Introuvable />

  const planning = q.plannings?.[0]
  const prochaines = (planning?.sessions_j ?? [])
    .filter((s) => s.date_session >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => a.date_session.localeCompare(b.date_session))
    .slice(0, 5)

  const metaDominante = q.identite_dominante ? GROUPE_META[q.identite_dominante] : null
  const metaCanal = q.canal_dominant ? GROUPE_META[q.canal_dominant] : null

  return (
    <div>
      <h1 className="animate-fade-up text-2xl font-bold tracking-tight text-gray-900">
        Bonjour {q.eleves?.prenom} 👋
      </h1>
      <p className="mt-1 animate-fade-up text-sm text-gray-600 anim-delay-75">
        Voici votre espace personnalisé Médecine Top 7 %.
      </p>

      {!q.generated_at && (
        <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          ⏳ Votre profil est en cours de génération. Cette page se mettra à jour
          automatiquement — revenez dans quelques instants.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className={cn('animate-fade-up transition-all hover:shadow-soft-lg anim-delay-100', metaDominante?.bg)}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Profil dominant</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={cn('text-2xl font-bold', metaDominante?.text ?? 'text-gray-400')}>
              {metaDominante?.emoji} {q.identite_dominante ?? 'En cours…'}
            </p>
            {q.identite_secondaire && (
              <p className="mt-1 text-sm text-gray-600">Secondaire : {q.identite_secondaire}</p>
            )}
          </CardContent>
        </Card>
        <Card className={cn('animate-fade-up transition-all hover:shadow-soft-lg anim-delay-150', metaCanal?.bg)}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Canal d&apos;apprentissage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={cn('text-2xl font-bold', metaCanal?.text ?? 'text-gray-400')}>
              {metaCanal?.emoji}{' '}
              {q.canal_dominant === 'Kinesthesique' ? 'Kinesthésique' : (q.canal_dominant ?? 'En cours…')}

            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">📅 Prochaines sessions de révision</CardTitle>
          </CardHeader>
          <CardContent>
            {prochaines.length === 0 ? (
              <p className="text-sm text-gray-500">
                Aucune session à venir pour le moment.
              </p>
            ) : (
              <ul className="space-y-2">
                {prochaines.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <Badge style={{ backgroundColor: COULEURS_J[s.type_j] }} className="text-gray-700">
                        {s.type_j}
                      </Badge>
                      <span className="text-sm font-medium text-gray-900">{s.matiere}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(s.date_session + 'T00:00:00Z').toLocaleDateString('fr-FR', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                      {s.duree_min ? ` · ${s.duree_min} min` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Accès rapide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { href: `/eleve/${id}/profil`, label: '🧠 Mon rapport de profil' },
              { href: `/eleve/${id}/planning/semaine`, label: '🗓️ Ma semaine type' },
              { href: `/eleve/${id}/planning/calendrier`, label: '📆 Mon calendrier J0→J60' },
              ...(q.has_bulletin ? [{ href: `/eleve/${id}/bulletin`, label: '📄 Mon bulletin analysé' }] : []),
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
              >
                {l.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {Array.isArray(q.dates_examens) && q.dates_examens.length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-base">🎯 Échéances</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {q.dates_examens.map((d) => (
              <Badge key={String(d)} className="bg-red-50 text-red-700">
                {new Date(String(d) + 'T00:00:00Z').toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
