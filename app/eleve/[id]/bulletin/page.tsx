'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchBulletins, type BulletinComplet } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Chargement } from '@/components/EtatChargement'

export default function BulletinElevePage() {
  const { id } = useParams<{ id: string }>()
  const [bulletins, setBulletins] = useState<BulletinComplet[] | null>(null)

  useEffect(() => {
    fetchBulletins(id).then(setBulletins)
  }, [id])

  if (bulletins === null) return <Chargement />

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Votre bulletin analysé</h1>

      {bulletins.length === 0 ? (
        <p className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          Aucun bulletin n&apos;a été fourni avec ce diagnostic.
        </p>
      ) : (
        <div className="mt-6 space-y-6">
          {bulletins.map((b) => (
            <div key={b.id}>
              <div className="mb-3 flex flex-wrap items-baseline gap-x-3 text-sm text-gray-600">
                {b.classe && <span className="font-semibold text-gray-900">{b.classe}</span>}
                {b.eleve_nom_bulletin && <span>{b.eleve_nom_bulletin}</span>}
                {b.source_filename && <span className="text-gray-400">({b.source_filename})</span>}
              </div>
              <div className="space-y-4">
                {b.bulletin_trimestres.map((t) => (
                  <Card key={t.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span>{t.periode}</span>
                        {t.moyenne_generale != null && (
                          <span className="text-indigo-600">
                            Moyenne : {Number(t.moyenne_generale).toLocaleString('fr-FR')} / 20
                          </span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {t.appreciation_globale && (
                        <p className="mb-4 rounded-lg bg-gray-50 p-3 text-sm italic text-gray-700">
                          « {t.appreciation_globale} »
                        </p>
                      )}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="text-left text-xs uppercase text-gray-500">
                            <tr>
                              <th className="py-2 pr-4">Matière</th>
                              <th className="py-2 pr-4">Moyenne</th>
                              <th className="py-2">Commentaire</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {t.bulletin_matieres.map((m) => (
                              <tr key={m.id}>
                                <td className="py-2 pr-4 font-medium text-gray-900">
                                  {m.matiere ?? m.nom}
                                </td>
                                <td className="py-2 pr-4 text-gray-700">
                                  {m.moyenne != null
                                    ? Number(m.moyenne).toLocaleString('fr-FR')
                                    : '—'}
                                </td>
                                <td className="py-2 text-gray-600">{m.commentaire ?? '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
