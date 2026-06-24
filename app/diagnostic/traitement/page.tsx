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
  // submitted_at tells us the minimum creation time so we don't pick up an old questionnaire
  const submittedAt = params.get('t') ? Number(params.get('t')) : null
  const [msgIdx, setMsgIdx] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [timedOut, setTimedOut] = useState(false)
  const [foundId, setFoundId] = useState<string | null>(null)
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
    const supabase = createClient()
    let stopped = false

    async function poll() {
      if (stopped) return

      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.email) {
        if (Date.now() - startRef.current > TIMEOUT_MS) {
          stopped = true
          setTimedOut(true)
        } else {
          setTimeout(poll, POLL_MS)
        }
        return
      }

      // Find the most recent questionnaire for this user via the eleves join
      // We look for one created after the form was submitted
      const minCreatedAt = submittedAt
        ? new Date(submittedAt - 5000).toISOString() // 5s buffer
        : new Date(startRef.current - 5000).toISOString()

      const { data } = await supabase
        .from('questionnaires')
        .select('id, eleves!inner(email)')
        .eq('eleves.email', user.email)
        .gte('created_at', minCreatedAt)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (data?.id) {
        stopped = true
        setFoundId(data.id)
        router.push(`/eleve/${data.id}`)
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
  }, [router, submittedAt])

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
          <Button onClick={() => window.location.reload()}>
            Continuer à attendre
          </Button>
        </div>
      </div>
    )
  }

  if (foundId) return (
    <div className="py-16 text-center text-gray-600 text-sm">Redirection en cours…</div>
  )

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
    <Suspense fallback={<div className="py-16 text-center text-sm text-gray-500">Chargement…</div>}>
      <Traitement />
    </Suspense>
  )
}
