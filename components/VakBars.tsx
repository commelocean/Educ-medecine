'use client'

import { REFERENCE_NATIONALE_VAK, VAK_COLORS } from '@/lib/constants'

const CANAUX = ['Visuel', 'Auditif', 'Kinesthesique'] as const
const LABELS: Record<string, string> = {
  Visuel: '👁️ Visuel',
  Auditif: '👂 Auditif',
  Kinesthesique: '🤲 Kinesthésique',
}

export default function VakBars({ scores }: { scores: Record<string, number> }) {
  return (
    <div className="space-y-5">
      {CANAUX.map((canal) => {
        const eleve =
          scores[canal] ?? (canal === 'Kinesthesique' ? scores['Kinesthésique'] : undefined) ?? 0
        const national = REFERENCE_NATIONALE_VAK[canal]
        return (
          <div key={canal}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-800">{LABELS[canal]}</span>
              <span className="text-gray-500">
                <strong className="text-gray-900">{eleve} %</strong> · nat. {national} %
              </span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${eleve}%`, backgroundColor: VAK_COLORS[canal] }}
              />
              <div
                aria-hidden
                title={`Référence nationale : ${national} %`}
                className="absolute top-0 h-full w-0.5 bg-gray-700"
                style={{ left: `${national}%` }}
              />
            </div>
          </div>
        )
      })}
      <p className="text-xs text-gray-400">Le trait vertical indique la référence nationale.</p>
    </div>
  )
}
