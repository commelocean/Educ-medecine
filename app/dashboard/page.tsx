'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { GROUPE_META } from '@/lib/questions'
import type { Eleve, Questionnaire, Profil, Planning } from '@/lib/types'

type EleveRow = Eleve & {
  questionnaires: (Questionnaire & {
    profils: Pick<Profil, 'id'>[]
    plannings: Pick<Planning, 'id'>[]
  })[]
}

const VAK_EMOJI: Record<string, string> = { Visuel: '👁️', Auditif: '👂', Kinesthesique: '🤲' }

export default function DashboardPage() {
  const [eleves, setEleves] = useState<EleveRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('eleves')
      .select(`
        *,
        questionnaires (
          id, identite_dominante, identite_secondaire, canal_dominant,
          has_bulletin, generated_at, submitted_at,
          profils (id),
          plannings (id)
        )
      `)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setEleves(data as EleveRow[])
        setLoading(false)
      })
  }, [])

  const filtered = eleves.filter(e =>
    `${e.prenom} ${e.nom} ${e.email}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Dashboard — Élèves</h1>
              <p className="text-gray-500 text-sm mt-1">{eleves.length} profil{eleves.length > 1 ? 's' : ''} enregistré{eleves.length > 1 ? 's' : ''}</p>
            </div>
            <Link href="/formulaire" className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm">
              + Nouveau diagnostic
            </Link>
          </div>
          <div className="mt-4">
            <input
              type="search"
              placeholder="Rechercher un élève..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full sm:w-80 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📊</div>
            <p className="text-gray-500">{search ? 'Aucun résultat pour cette recherche.' : 'Aucun élève encore. Commencez par un diagnostic !'}</p>
            {!search && (
              <Link href="/formulaire" className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700">
                Premier diagnostic
              </Link>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(eleve => {
              const q = eleve.questionnaires?.[0]
              const hasProfil = q?.profils?.length > 0
              const hasPlanning = q?.plannings?.length > 0
              const meta = q?.identite_dominante ? GROUPE_META[q.identite_dominante] : null
              return (
                <Link key={eleve.id} href={`/eleve/${eleve.id}`} className="block">
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-indigo-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-xl font-bold text-indigo-600">
                        {eleve.prenom?.[0]}{eleve.nom?.[0]}
                      </div>
                      <div className="flex gap-1">
                        {hasProfil && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">✓ Profil</span>}
                        {hasPlanning && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">✓ Planning</span>}
                        {!hasProfil && !hasPlanning && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">⏳ Traitement</span>}
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">{eleve.prenom} {eleve.nom}</div>
                    <div className="text-sm text-gray-500 mb-3">{eleve.email}</div>
                    {q && (
                      <div className="flex flex-wrap gap-2">
                        {meta && (
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.bg} ${meta.text}`}>
                            {meta.emoji} {q.identite_dominante}
                          </span>
                        )}
                        {q.canal_dominant && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                            {VAK_EMOJI[q.canal_dominant]} {q.canal_dominant}
                          </span>
                        )}
                        {q.has_bulletin && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">📚 Bulletin</span>
                        )}
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-3">
                      {new Date(eleve.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
