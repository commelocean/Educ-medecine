'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { MOYENNE_NATIONALE_IDENTITE } from '@/lib/constants'

const AXES = [
  'Perfectionniste',
  'Aimable',
  'Dynamique',
  'Rebelle',
  'Intellectuel',
  'Enthousiaste',
  'Émotionnel',
]

export default function RadarIdentite({ scores }: { scores: Record<string, number> }) {
  const data = AXES.map((axe) => ({
    axe,
    eleve: scores[axe] ?? 0,
    national: MOYENNE_NATIONALE_IDENTITE[axe] ?? 0,
  }))

  return (
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={data} outerRadius="70%">
        <PolarGrid stroke="#E5E7EB" />
        <PolarAngleAxis dataKey="axe" tick={{ fontSize: 11, fill: '#374151' }} />
        <PolarRadiusAxis angle={90} domain={[0, 'auto']} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
        <Radar
          name="Votre profil"
          dataKey="eleve"
          stroke="#6366F1"
          fill="#6366F1"
          fillOpacity={0.35}
        />
        <Radar
          name="Moyenne nationale"
          dataKey="national"
          stroke="#9CA3AF"
          fill="#9CA3AF"
          fillOpacity={0.15}
          strokeDasharray="4 4"
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
