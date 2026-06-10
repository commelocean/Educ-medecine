'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDiagnosticStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ExamensPage() {
  const router = useRouter()
  const { datesExamens, addDateExamen, removeDateExamen } = useDiagnosticStore()
  const [draft, setDraft] = useState('')
  const [showError, setShowError] = useState(false)

  function add() {
    if (draft) {
      addDateExamen(draft)
      setDraft('')
      setShowError(false)
    }
  }

  function next() {
    if (datesExamens.length === 0) {
      setShowError(true)
      return
    }
    router.push('/diagnostic/bulletin')
  }

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-gray-900">Vos dates d&apos;examens</h1>
      <p className="mb-5 text-sm text-gray-600">
        Sélectionnez les dates précises de vos concours ou examens. La répétition espacée
        (J0 → J60) sera calée sur ces échéances.
      </p>

      <Card>
        <CardContent className="p-5">
          <Label htmlFor="date-examen">Ajouter une date</Label>
          <div className="mt-1.5 flex gap-2">
            <Input
              id="date-examen"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <Button type="button" onClick={add} disabled={!draft}>
              Ajouter
            </Button>
          </div>
          {showError && (
            <p className="mt-2 text-sm text-red-600">Ajoutez au moins une date d&apos;examen.</p>
          )}

          {datesExamens.length > 0 && (
            <ul className="mt-5 space-y-2">
              {datesExamens.map((d) => (
                <li
                  key={d}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5"
                >
                  <span className="text-sm font-medium text-gray-800">
                    📅{' '}
                    {new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <button
                    type="button"
                    aria-label={`Supprimer la date ${d}`}
                    onClick={() => removeDateExamen(d)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={() => router.push('/diagnostic/emploi-du-temps')}>
          ← Retour
        </Button>
        <Button onClick={next}>Bulletin scolaire →</Button>
      </div>
    </div>
  )
}
