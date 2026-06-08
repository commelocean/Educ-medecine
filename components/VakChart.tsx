'use client'

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS: Record<string, string> = {
  Visuel: '#06B6D4',
  Auditif: '#7C3AED',
  Kinesthesique: '#14B8A6',
}

interface Props { scores: Record<string, number> }

export function VakChart({ scores }: Props) {
  const data = Object.entries(scores)
    .filter(([k]) => !k.startsWith('_'))
    .map(([name, value]) => ({ name, value }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={85}
          label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}
          labelLine={false}
        >
          {data.map(entry => (
            <Cell key={entry.name} fill={COLORS[entry.name] ?? '#94A3B8'} />
          ))}
        </Pie>
        <Tooltip formatter={(v: number) => [`${v}%`]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
