'use client'

import { useEffect, useState } from 'react'
import { fetchQuestionnaireComplet, type QuestionnaireComplet } from './data'

export function useQuestionnaire(id: string | undefined) {
  const [data, setData] = useState<QuestionnaireComplet | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    let active = true
    fetchQuestionnaireComplet(id).then((d) => {
      if (active) {
        setData(d)
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [id])

  return { data, loading }
}
