'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDiagnosticStore } from '@/lib/store'
import { IDENTITY_QUESTIONS, SCHEDULE_FIELDS } from '@/lib/questions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function SectionCard({
  titre,
  editHref,
  children,
}: {
  titre: string
  editHref: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base">{titre}</CardTitle>
        <Link href={editHref} className="text-sm font-medium text-indigo-600 hover:underline">
          Modifier
        </Link>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default function RecapPage() {
  const router = useRouter()
  const store = useDiagnosticStore()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const nbOui = Object.values(store.reponses).filter((r) => r === 'OUI').length
  const nbRepondu = IDENTITY_QUESTIONS.filter((q) => store.reponses[q.id]).length
  const edtRempli = SCHEDULE_FIELDS.filter(
    (f) => !['Q46', 'Q47', 'Q48'].includes(f.id) && store.emploiDuTemps[f.id]
  )

  const complet =
    nbRepondu === 40 &&
    store.datesExamens.length > 0 &&
    store.volumeChapitresJour &&
    store.dureeTransport

  async function submit() {
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/diagnostic/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reponses: store.reponses,
          emploi_du_temps: store.emploiDuTemps,
          dates_examens: store.datesExamens,
          volume_chapitres_jour: store.volumeChapitresJour,
          duree_transport: store.dureeTransport,
          bulletin_base64: store.bulletinBase64,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la soumission.')
      store.reset()
      router.push(`/diagnostic/traitement?id=${data.questionnaire_id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-gray-900">Récapitulatif</h1>
      <p className="mb-5 text-sm text-gray-600">
        Vérifiez vos informations avant de lancer l&apos;analyse. Chaque section reste modifiable.
      </p>

      <div className="space-y-4">
        <SectionCard titre="✅ Questionnaire (Q01-Q40)" editHref="/diagnostic/questions">
          <p className="text-sm text-gray-700">
            {nbRepondu} / 40 questions répondues — dont {nbOui} « OUI ».
          </p>
          {nbRepondu < 40 && (
            <p className="mt-1 text-sm text-red-600">Il reste des questions sans réponse.</p>
          )}
        </SectionCard>

        <SectionCard titre="🗓️ Emploi du temps" editHref="/diagnostic/emploi-du-temps">
          {edtRempli.length === 0 ? (
            <p className="text-sm text-red-600">Aucune information saisie.</p>
          ) : (
            <dl className="space-y-1 text-sm">
              {edtRempli.map((f) => (
                <div key={f.id} className="flex justify-between gap-4">
                  <dt className="text-gray-500">{f.label}</dt>
                  <dd className="text-right font-medium text-gray-800">
                    {store.emploiDuTemps[f.id]}
                  </dd>
                </div>
              ))}
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Volume de chapitres / jour</dt>
                <dd className="font-medium text-gray-800">{store.volumeChapitresJour || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Transports</dt>
                <dd className="font-medium text-gray-800">{store.dureeTransport || '—'}</dd>
              </div>
            </dl>
          )}
        </SectionCard>

        <SectionCard titre="🎯 Dates d'examens" editHref="/diagnostic/examens">
          {store.datesExamens.length === 0 ? (
            <p className="text-sm text-red-600">Aucune date sélectionnée.</p>
          ) : (
            <ul className="flex flex-wrap gap-2 text-sm">
              {store.datesExamens.map((d) => (
                <li key={d} className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700">
                  {new Date(d + 'T00:00:00').toLocaleDateString('fr-FR')}
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard titre="📄 Bulletin scolaire" editHref="/diagnostic/bulletin">
          <p className="text-sm text-gray-700">
            {store.bulletinBase64
              ? `Fichier joint : ${store.bulletinFilename}`
              : 'Aucun bulletin fourni (optionnel).'}
          </p>
        </SectionCard>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={() => router.push('/diagnostic/bulletin')}>
          ← Retour
        </Button>
        <Button size="lg" onClick={submit} disabled={!complet || submitting}>
          {submitting ? 'Envoi en cours…' : '🚀 Lancer mon diagnostic'}
        </Button>
      </div>
    </div>
  )
}
