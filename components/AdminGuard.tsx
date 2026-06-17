'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Chargement } from '@/components/EtatChargement'
import { ADMIN_EMAILS } from '@/lib/config'

// Garde côté client : la vraie protection des données se fait via RLS
// (cf. supabase/migrations) — le service role est réservé au serveur.
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'denied'>('loading')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      const allowed = ADMIN_EMAILS
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
      const isAdmin =
        user &&
        (user.app_metadata?.role === 'admin' ||
          allowed.includes((user.email ?? '').toLowerCase()))
      setStatus(isAdmin ? 'ok' : 'denied')
    })
  }, [])

  if (status === 'loading') return <Chargement />
  if (status === 'denied')
    return (
      <div className="py-20 text-center text-gray-600">
        ⛔ Accès réservé aux administrateurs.
      </div>
    )
  return <>{children}</>
}
