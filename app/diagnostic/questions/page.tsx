'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IDENTITY_QUESTIONS, GROUPE_META } from '@/lib/questions'
import { useDiagnosticStore, type Reponse } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 3 sections : identité 1/2 (Q01-Q20), identité 2/2 (Q21-Q28), canaux VAK (Q29-Q40)
const SECTIONS = [
  { titre: 'Votre personnalité (1/2)', questions: IDENTITY_QUESTIONS.slice(0, 14) },
  { titre: 'Votre personnalité (2/2)', questions: IDENTITY_QUESTIONS.slice(14, 28) },
  { titre: 'Votre façon d’apprendre', questions: IDENTITY_QUESTIONS.slice(28, 40) },
]

function OuiNon({
  value,
  onChange,
  name,
}: {
  value?: Reponse
  onChange: (r: Reponse) => void
  name: string
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex gap-2">
      {(['OUI', 'NON'] as const).map((r) => (
        <button
          key={r}
          type="button"
          role="radio"
          aria-checked={value === r}
          onClick={() => onChange(r)}
          className={cn(
            'h-10 flex-1 rounded-lg border text-sm font-semibold transition-colors sm:w-20 sm:flex-none',
            value === r
              ? r === 'OUI'
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-gray-800 bg-gray-800 text-white'
              : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
          )}
        >
          {r}
        </button>
      ))}
    </div>
  )
}

export default function QuestionsPage() {
  const router = useRouter()
  const { reponses, setReponse } = useDiagnosticStore()
  const [section, setSection] = useState(0)
  const [showErrors, setShowErrors] = useState(false)

  const questions = SECTIONS[section].questions
  const nbRepondu = useMemo(
    () => IDENTITY_QUESTIONS.filter((q) => reponses[q.id]).length,
    [reponses]
  )
  const sectionComplete = questions.every((q) => reponses[q.id])

  function next() {
    if (!sectionComplete) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    if (section < SECTIONS.length - 1) {
      setSection(section + 1)
      window.scrollTo({ top: 0 })
    } else {
      router.push('/diagnostic/emploi-du-temps')
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">{SECTIONS[section].titre}</h1>
        <span className="text-sm text-gray-500">{nbRepondu} / 40 réponses</span>
      </div>

      <div className="space-y-3">
        {questions.map((q) => {
          const meta = GROUPE_META[q.groupe]
          const manquant = showErrors && !reponses[q.id]
          return (
            <Card key={q.id} className={cn(manquant && 'border-red-300 ring-1 ring-red-200')}>
              <CardContent className="p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Badge className={cn(meta?.bg, meta?.text)}>
                    {meta?.emoji} {q.id}
                  </Badge>
                  {manquant && <span className="text-xs text-red-600">Réponse requise</span>}
                </div>
                <p className="mb-3 text-sm text-gray-800 sm:text-base">{q.label}</p>
                <OuiNon name={q.label} value={reponses[q.id]} onChange={(r) => setReponse(q.id, r)} />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={() => (section > 0 ? setSection(section - 1) : router.push('/onboarding'))}
        >
          ← Retour
        </Button>
        <Button onClick={next}>
          {section < SECTIONS.length - 1 ? 'Section suivante →' : 'Emploi du temps →'}
        </Button>
      </div>
    </div>
  )
}
