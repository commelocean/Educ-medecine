'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function NavUser() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  async function logout() {
    await createClient().auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (!user) {
    return (
      <Link
        href="/auth"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Connexion
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-gray-600 sm:block">
        {(user.user_metadata?.prenom as string) ?? user.email}
      </span>
      <Link
        href="/onboarding"
        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Mon diagnostic
      </Link>
      <button
        onClick={logout}
        className="rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
      >
        Déconnexion
      </button>
    </div>
  )
}
