'use client'

import { usePathname } from 'next/navigation'
import { Progress } from '@/components/ui/progress'

const ETAPES = [
  { path: '/diagnostic/questions', label: 'Questions' },
  { path: '/diagnostic/emploi-du-temps', label: 'Emploi du temps' },
  { path: '/diagnostic/examens', label: 'Examens' },
  { path: '/diagnostic/bulletin', label: 'Bulletin' },
  { path: '/diagnostic/recap', label: 'Récapitulatif' },
  { path: '/diagnostic/traitement', label: 'Analyse' },
]

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const idx = Math.max(0, ETAPES.findIndex((e) => pathname.startsWith(e.path)))
  const pct = ((idx + 1) / ETAPES.length) * 100

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-900">
            Étape {idx + 1} / {ETAPES.length} — {ETAPES[idx].label}
          </span>
          <span className="text-gray-500">{Math.round(pct)} %</span>
        </div>
        <Progress value={pct} />
      </div>
      {children}
    </div>
  )
}
