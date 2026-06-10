'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function EleveLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>()
  const pathname = usePathname()

  const tabs = [
    { href: `/eleve/${id}`, label: 'Tableau de bord', exact: true },
    { href: `/eleve/${id}/profil`, label: 'Mon profil' },
    { href: `/eleve/${id}/planning/semaine`, label: 'Semaine type' },
    { href: `/eleve/${id}/planning/calendrier`, label: 'Calendrier' },
    { href: `/eleve/${id}/bulletin`, label: 'Bulletin' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav aria-label="Navigation élève" className="mb-6 overflow-x-auto">
        <div className="flex gap-1 border-b border-gray-200">
          {tabs.map((t) => {
            const active = t.exact ? pathname === t.href : pathname.startsWith(t.href)
            return (
              <Link
                key={t.href}
                href={t.href}
                className={cn(
                  'whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                )}
              >
                {t.label}
              </Link>
            )
          })}
        </div>
      </nav>
      {children}
    </div>
  )
}
