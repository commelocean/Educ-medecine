'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { GROUPE_META } from '@/lib/questions'
import type { EleveComplet } from '@/lib/types'
import { RadarIdentite } from '@/components/RadarIdentite'
import { VakChart } from '@/components/VakChart'
import { PlanningWeek } from '@/components/PlanningWeek'
import { SessionsJ } from '@/components/SessionsJ'

type Tab = 'profil' | 'planning' | 'sessions' | 'bulletin'

const VAK_LABELS: Record<string, string> = {
  Visuel: '👁️ Visuel',
  Auditif: '👂 Auditif',
  Kinesthesique: '🤲 Kinesthésique',
}

export default function ElevePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [eleve, setEleve] = useState<EleveComplet | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('profil')

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('eleves')
      .select(`
        *,
        questionnaires (
          *,
          profils (*),
          plannings (
            *,
            planning_creneaux (*),
            sessions_j (*)
          )
        )
      `)
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { router.push('/dashboard'); return }
        setEleve(data as EleveComplet)
        setLoading(false)
      })
  }, [id, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!eleve) return null

  const q = eleve.questionnaires?.[0]
  const profil = q?.profils?.[0]
  const planning = q?.plannings?.[0]
  const creneaux = planning?.planning_creneaux ?? []
  const sessions = planning?.sessions_j ?? []
  const meta = q?.identite_dominante ? GROUPE_META[q.identite_dominante] : null

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: 'profil',    label: 'Profil',   emoji: '🧠' },
    { id: 'planning',  label: 'Planning', emoji: '📅' },
    { id: 'sessions',  label: 'Sessions', emoji: '🔄' },
    { id: 'bulletin',  label: 'Bulletin', emoji: '📚' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-700 mb-4 inline-flex items-center gap-1">
            ← Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-indigo-600">
              {eleve.prenom?.[0]}{eleve.nom?.[0]}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold text-gray-900">{eleve.prenom} {eleve.nom}</h1>
              <p className="text-gray-500 text-sm">{eleve.email}</p>
              {eleve.date_naissance && (
                <p className="text-gray-400 text-xs mt-0.5">
                  Né(e) le {new Date(eleve.date_naissance).toLocaleDateString('fr-FR')}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {meta && (
                <span className={`inline-flex items-center gap-1 font-bold px-3 py-1.5 rounded-xl text-sm ${meta.bg} ${meta.text}`}>
                  {meta.emoji} {q?.identite_dominante}
                </span>
              )}
              {q?.canal_dominant && (
                <span className="inline-flex items-center gap-1 font-semibold px-3 py-1.5 rounded-xl text-sm bg-gray-100 text-gray-700">
                  {VAK_LABELS[q.canal_dominant]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 border-b border-gray-100">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  tab === t.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PROFIL TAB */}
        {tab === 'profil' && (
          <div className="space-y-6 animate-fade-in">
            {!q ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">⏳</div>
                <p>Le profil est en cours de génération par l\'IA.</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-800 mb-4">🎡 Profil d\'identité</h2>
                    {q.scores_identite_pct ? (
                      <RadarIdentite scores={q.scores_identite_pct} />
                    ) : (
                      <p className="text-gray-400 text-sm text-center py-8">Données en attente</p>
                    )}
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-800 mb-4">🎨 Canal d\'apprentissage VAK</h2>
                    {q.canaux_vak_pct ? (
                      <VakChart scores={q.canaux_vak_pct} />
                    ) : (
                      <p className="text-gray-400 text-sm text-center py-8">Données en attente</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {q.identite_dominante && (
                    <div className={`rounded-2xl border p-4 ${GROUPE_META[q.identite_dominante]?.bg} ${GROUPE_META[q.identite_dominante]?.border}`}>
                      <div className="text-xs font-bold text-gray-500 mb-1">PROFIL DOMINANT</div>
                      <div className={`text-lg font-extrabold ${GROUPE_META[q.identite_dominante]?.text}`}>
                        {GROUPE_META[q.identite_dominante]?.emoji} {q.identite_dominante}
                      </div>
                    </div>
                  )}
                  {q.identite_secondaire && (
                    <div className={`rounded-2xl border p-4 ${GROUPE_META[q.identite_secondaire]?.bg} ${GROUPE_META[q.identite_secondaire]?.border}`}>
                      <div className="text-xs font-bold text-gray-500 mb-1">PROFIL SECONDAIRE</div>
                      <div className={`text-lg font-extrabold ${GROUPE_META[q.identite_secondaire]?.text}`}>
                        {GROUPE_META[q.identite_secondaire]?.emoji} {q.identite_secondaire}
                      </div>
                    </div>
                  )}
                  {q.canal_dominant && (
                    <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
                      <div className="text-xs font-bold text-gray-500 mb-1">CANAL VAK</div>
                      <div className="text-lg font-extrabold text-cyan-700">
                        {VAK_LABELS[q.canal_dominant]}
                      </div>
                    </div>
                  )}
                </div>

                {profil ? (
                  <div className="space-y-4">
                    {profil.motivation && (
                      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                        <h3 className="font-bold text-amber-800 mb-2">⚡ Motivations profondes</h3>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{profil.motivation}</p>
                      </div>
                    )}
                    {profil.synthese_narrative && (
                      <div className="bg-white border border-gray-100 rounded-2xl p-6">
                        <h3 className="font-bold text-gray-800 mb-2">📝 Synthèse neuropédagogique</h3>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{profil.synthese_narrative}</p>
                      </div>
                    )}
                    {profil.conseil_strategique && (
                      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                        <h3 className="font-bold text-indigo-800 mb-2">🎯 Conseils stratégiques</h3>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{profil.conseil_strategique}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-2">⏳</div>
                    <p className="text-amber-700 font-medium">Le profil narratif est en cours de génération par l\'IA.</p>
                    <p className="text-amber-600 text-sm mt-1">Actualisez la page dans quelques minutes.</p>
                  </div>
                )}

                {q.dates_examens && q.dates_examens.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-3">📌 Examens cibles</h3>
                    <div className="flex flex-wrap gap-2">
                      {q.dates_examens.map(d => (
                        <span key={d} className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-3 py-1 rounded-lg">
                          {new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* PLANNING TAB */}
        {tab === 'planning' && (
          <div className="animate-fade-in">
            {!planning ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">⏳</div>
                <p>Le planning est en cours de génération.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-800 mb-6">📅 Planning hebdomadaire</h2>
                  <PlanningWeek creneaux={creneaux} />
                </div>
                {planning.notes_methodo && (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                    <h3 className="font-bold text-indigo-800 mb-2">📌 Notes méthodologiques</h3>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{planning.notes_methodo}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SESSIONS TAB */}
        {tab === 'sessions' && (
          <div className="animate-fade-in">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-800 mb-2">🔄 Révisions espacées</h2>
              <p className="text-sm text-gray-500 mb-6">Protocole J0 → J1 → J7 → J14 → J30 → J60 adapté à votre profil {q?.canal_dominant ?? ''}.</p>
              <SessionsJ sessions={sessions} />
            </div>
          </div>
        )}

        {/* BULLETIN TAB */}
        {tab === 'bulletin' && (
          <div className="animate-fade-in">
            {!q?.has_bulletin ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📚</div>
                <p className="text-gray-500">Aucun bulletin n\'a été téléversé lors du diagnostic.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-800 mb-4">📚 Bulletin scolaire</h2>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-sm text-emerald-700">
                  ✅ Un bulletin PDF a été analysé par OCR. Les données sont intégrées dans la synthèse du profil.
                </div>
                {profil?.preuves_bulletin && Array.isArray(profil.preuves_bulletin) && profil.preuves_bulletin.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Points clés extraits</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {(profil.preuves_bulletin as string[]).map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
