'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AdminGuard } from '@/components/AdminGuard'
import { GROUPE_META } from '@/lib/questions'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Chargement } from '@/components/EtatChargement'
import { cn } from '@/lib/utils'
import type { Eleve, Questionnaire } from '@/lib/types'

type Ligne = Eleve & { questionnaires: (Questionnaire & { profils: { id: string }[] })[] }

const PROFILS = ['Perfectionniste', 'Aimable', 'Dynamique', 'Rebelle', 'Intellectuel', 'Enthousiaste', 'Émotionnel']
const CANAUX = ['Visuel', 'Auditif', 'Kinesthesique']

function ListeEleves() {
  const [eleves, setEleves] = useState<Ligne[] | null>(null)
  const [recherche, setRecherche] = useState('')
  const [filtreProfil, setFiltreProfil] = useState('')
  const [filtreCanal, setFiltreCanal] = useState('')
  const [filtreStatut, setFiltreStatut] = useState('')

  useEffect(() => {
    const supabase = createClient()
    ;(async () => {
      try {
        const { data } = await supabase
          .from('eleves')
          .select('*, questionnaires(*, profils(id))')
          .order('created_at', { ascending: false })
        setEleves((data ?? []) as Ligne[])
      } catch (err) {
        console.error('admin eleves fetch error', err)
        setEleves([])
      }
    })()
  }, [])

  const filtres = useMemo(() => {
    if (!eleves) return []
    return eleves.filter((e) => {
      const q = e.questionnaires?.[0]
      if (recherche) {
        const r = recherche.toLowerCase()
        if (!`${e.prenom} ${e.nom} ${e.email}`.toLowerCase().includes(r)) return false
      }
      if (filtreProfil && q?.identite_dominante !== filtreProfil) return false
      if (filtreCanal && q?.canal_dominant !== filtreCanal) return false
      if (filtreStatut === 'traite' && !q?.generated_at) return false
      if (filtreStatut === 'en_cours' && (q?.generated_at || !q)) return false
      if (filtreStatut === 'sans' && q) return false
      return true
    })
  }, [eleves, recherche, filtreProfil, filtreCanal, filtreStatut])

  if (!eleves) return <Chargement />

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Élèves ({filtres.length})</h1>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <Input
          placeholder="Rechercher nom ou email…"
          aria-label="Rechercher"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <Select aria-label="Filtrer par profil" value={filtreProfil} onChange={(e) => setFiltreProfil(e.target.value)}>
          <option value="">Tous profils</option>
          {PROFILS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </Select>
        <Select aria-label="Filtrer par canal" value={filtreCanal} onChange={(e) => setFiltreCanal(e.target.value)}>
          <option value="">Tous canaux</option>
          {CANAUX.map((c) => (
            <option key={c} value={c}>
              {c === 'Kinesthesique' ? 'Kinesthésique' : c}
            </option>
          ))}
        </Select>
        <Select aria-label="Filtrer par statut" value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}>
          <option value="">Tous statuts</option>
          <option value="traite">Diagnostic traité</option>
          <option value="en_cours">En cours de traitement</option>
          <option value="sans">Sans diagnostic</option>
        </Select>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Élève</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Profil dominant</th>
              <th className="px-4 py-3">Canal</th>
              <th className="px-4 py-3">Inscription</th>
              <th className="px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtres.map((e) => {
              const q = e.questionnaires?.[0]
              const meta = q?.identite_dominante ? GROUPE_META[q.identite_dominante] : null
              return (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/eleves/${e.id}`}
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      {e.prenom} {e.nom}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{e.email}</td>
                  <td className="px-4 py-3">
                    {q?.identite_dominante ? (
                      <Badge className={cn(meta?.bg, meta?.text)}>
                        {meta?.emoji} {q.identite_dominante}
                      </Badge>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {q?.canal_dominant === 'Kinesthesique' ? 'Kinesthésique' : (q?.canal_dominant ?? '—')}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(e.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3">
                    {!q ? (
                      <Badge className="bg-gray-100 text-gray-600">Sans diagnostic</Badge>
                    ) : q.generated_at ? (
                      <Badge className="bg-emerald-50 text-emerald-700">✓ Traité</Badge>
                    ) : (
                      <Badge className="bg-amber-50 text-amber-700">⏳ En cours</Badge>
                    )}
                  </td>
                </tr>
              )
            })}
            {filtres.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                  Aucun élève ne correspond à ces critères.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function AdminElevesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <AdminGuard>
        <ListeEleves />
      </AdminGuard>
    </div>
  )
}
