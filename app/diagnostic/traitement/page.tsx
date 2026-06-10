'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

const TIMEOUT_MS = 180_000
const POLL_MS = 3_000

const MESSAGES = [
  'Analyse de vos 48 réponses…',
  'Calcul de votre profil d’identité…',
  'Détermination de votre canal d’apprentissage dominant…',
  'Lecture de votre bulletin scolaire…',
  'Construction de votre planning en répétition espacée…',
  'Finalisation de votre rapport personnalisé…',
]

function Traitement() {
  const router = useRouter()
  const params = useSearchParams()
  const questionnaireId = params.get('id')
  const [msgIdx, setMsgIdx] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [timedOut, setTimedOut] = useState(false)
  const startRef = useRef(Date.now())

  useEffect(() => {
    const t = setInterval(() => setMsgIdx((i) => (i + 1) % MESSAGES.length), 6000)
    const e = setInterval(() => setElapsed(Date.now() - startRef.current), 1000)
    return () => {
      clearInterval(t)
      clearInterval(e)
    }
  }, [])

  useEffect(() => {
    if (!questionnaireId) return
    const supabase = createClient()
    let stopped = false

    async function poll() {
      if (stopped) return
      const { data } = await supabase
        .from('questionnaires')
        .select('generated_at')
        .eq('id', questionnaireId)
        .maybeSingle()

      if (data?.generated_at) {
        stopped = true
        router.push(`/eleve/${questionnaireId}`)
        return
      }
      if (Date.now() - startRef.current > TIMEOUT_MS) {
        stopped = true
        setTimedOut(true)
        return
      }
      setTimeout(poll, POLL_MS)
    }

    poll()
    return () => {
      stopped = true
    }
  }, [questionnaireId, router])

  if (!questionnaireId) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-600">Identifiant de questionnaire manquant.</p>
        <Button className="mt-4" onClick={() => router.push('/onboarding')}>
          Retour
        </Button>
      </div>
    )
  }

  if (timedOut) {
    return (
      <div className="py-16 text-center">
        <p className="text-4xl">⏳</p>
        <h1 className="mt-4 text-xl font-bold text-gray-900">
          L&apos;analyse prend plus de temps que prévu
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
          Votre diagnostic est bien enregistré et continue d&apos;être traité. Vous pouvez
          consulter votre espace : les résultats apparaîtront dès qu&apos;ils seront prêts.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Réessayer
          </Button>
          <Button onClick={() => router.push(`/eleve/${questionnaireId}`)}>
            Voir mon espace
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 text-center">
      <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      <h1 className="mt-6 text-xl font-bold text-gray-900">Analyse en cours</h1>
      <p className="mt-2 text-sm text-gray-600 animate-fade-in" key={msgIdx}>
        {MESSAGES[msgIdx]}
      </p>
      <p className="mt-6 text-xs text-gray-400">
        {Math.round(elapsed / 1000)} s écoulées — le traitement peut durer jusqu&apos;à 2 minutes.
      </p>
    </div>
  )
}

export default function TraitementPage() {
  return (
    <Suspense>
      <Traitement />
    </Suspense>
  )
}
