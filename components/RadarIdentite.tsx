'use client'

import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip
} from 'recharts'
import { GROUPE_META } from '@/lib/questions'

interface Props { scores: Record<string, number> }

export function RadarIdentite({ scores }: Props) {
  const data = Object.entries(scores).map(([subject, score]) => ({ subject, score, fullMark: 100 }))
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
        <PolarGrid gridType="polygon" />
        <PolarAngleAxis
          dataKey="subject"
          tick={({ x, y, payload }: { x: number; y: number; payload: { value: string } }) => {
            const meta = GROUPE_META[payload.value]
            return (
              <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={11} fill="#4B5563">
                {meta?.emoji} {payload.value}
              </text>
            )
          }}
        />
        <Radar name="Score" dataKey="score" stroke="#6366F1" fill="#6366F1" fillOpacity={0.25} strokeWidth={2} />
        <Tooltip formatter={(v: number) => [`${v}%`, 'Score']} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
