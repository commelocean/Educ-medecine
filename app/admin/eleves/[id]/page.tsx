'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminGuard } from '@/components/AdminGuard'
import { GROUPE_META } from '@/lib/questions'
import RadarIdentite from '@/components/RadarIdentite'
import VakBars from '@/components/VakBars'
import PlanningWeek from '@/components/PlanningWeek'
import SessionsJ from '@/components/SessionsJ'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Chargement, Introuvable } from '@/components/EtatChargement'
import { cn } from '@/lib/utils'
import type { EleveComplet } from '@/lib/types'

interface ReponseRow {
  id: string
  question_id: string
  groupe: string
  libelle?: string
  reponse: string
}

function FicheEleve() {
  const { id } = useParams<{ id: string }>()
  const [eleve, setEleve] = useState<EleveComplet | null | undefined>(undefined)
  const [reponses, setReponses] = useState<ReponseRow[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('eleves')
      .select(
        '*, questionnaires(*, profils(*), plannings(*, planning_creneaux(*), sessions_j(*)))'
      )
      .eq('id', id)
      .maybeSingle()
      .then(async ({ data }) => {
        setEleve((data as EleveComplet) ?? null)
        const qid = (data as EleveComplet | null)?.questionnaires?.[0]?.id
        if (qid) {
          const { data: rep } = await supabase
            .from('reponses_questionnaire')
            .select('*')
            .eq('questionnaire_id', qid)
            .order('question_id')
          setReponses((rep ?? []) as ReponseRow[])
        }
      })
  }, [id])

  if (eleve === undefined) return <Chargement />
  if (!eleve) return <Introuvable message="Élève introuvable." />

  const q = eleve.questionnaires?.[0]
  const profil = q?.profils?.[0]
  const planning = q?.plannings?.[0]
  const meta = q?.identite_dominante ? GROUPE_META[q.identite_dominante] : null

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/eleves" className="text-sm text-indigo-600 hover:underline">
          ← Retour à la liste
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          {eleve.prenom} {eleve.nom}
        </h1>
        <p className="text-sm text-gray-600">
          {eleve.email}
          {eleve.date_naissance &&
            ` · né(e) le ${new Date(eleve.date_naissance).toLocaleDateString('fr-FR')}`}
          {' · inscrit(e) le '}
          {new Date(eleve.created_at).toLocaleDateString('fr-FR')}
        </p>
        {q && (
          <div className="mt-3 flex flex-wrap gap-2">
            {q.identite_dominante && (
              <Badge className={cn(meta?.bg, meta?.text)}>
                {meta?.emoji} {q.identite_dominante}
              </Badge>
            )}
            {q.canal_dominant && (
              <Badge className="bg-cyan-50 text-cyan-700">
                Canal : {q.canal_dominant === 'Kinesthesique' ? 'Kinesthésique' : q.canal_dominant}
              </Badge>
            )}
            <Badge className={q.generated_at ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}>
              {q.generated_at ? '✓ Traité' : '⏳ En cours'}
            </Badge>
            {q.has_bulletin && <Badge className="bg-gray-100 text-gray-700">📄 Bulletin fourni</Badge>}
          </div>
        )}
      </div>

      {!q ? (
        <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          Cet élève n&apos;a pas encore soumis de diagnostic.
        </p>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profils d&apos;identité</CardTitle>
              </CardHeader>
              <CardContent>
                {q.scores_identite_pct ? (
                  <RadarIdentite scores={q.scores_identite_pct} />
                ) : (
                  <p className="py-8 text-center text-sm text-gray-400">Non calculé</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Canaux VAK</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {q.canaux_vak_pct ? (
                  <VakBars scores={q.canaux_vak_pct} />
                ) : (
                  <p className="py-8 text-center text-sm text-gray-400">Non calculé</p>
                )}
              </CardContent>
            </Card>
          </div>

          {profil && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Rapport narratif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-gray-700">
                {profil.motivation && (
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Motivation</h3>
                    <p className="whitespace-pre-line">{profil.motivation}</p>
                  </div>
                )}
                {profil.synthese_narrative && (
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Synthèse</h3>
                    <p className="whitespace-pre-line">{profil.synthese_narrative}</p>
                  </div>
                )}
                {profil.conseil_strategique && (
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Conseil stratégique</h3>
                    <p className="whitespace-pre-line">{profil.conseil_strategique}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {planning && planning.planning_creneaux.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Semaine type</CardTitle>
              </CardHeader>
              <CardContent>
                <PlanningWeek creneaux={planning.planning_creneaux} />
              </CardContent>
            </Card>
          )}

          {planning && planning.sessions_j.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Sessions J ({planning.sessions_j.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SessionsJ sessions={planning.sessions_j} />
              </CardContent>
            </Card>
          )}

          {reponses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Réponses brutes ({reponses.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {reponses.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between rounded border border-gray-100 px-3 py-1.5 text-xs"
                    >
                      <span className="text-gray-600">
                        <strong>{r.question_id}</strong> ({r.groupe})
                      </span>
                      <span
                        className={cn(
                          'font-semibold',
                          r.reponse === 'OUI' ? 'text-emerald-600' : 'text-gray-500'
                        )}
                      >
                        {r.reponse}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}

export default function AdminEleveDetailPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <AdminGuard>
        <FicheEleve />
      </AdminGuard>
    </div>
  )
}
