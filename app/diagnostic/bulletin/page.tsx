'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDiagnosticStore } from '@/lib/store'
import { BULLETIN_MAX_BYTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function BulletinPage() {
  const router = useRouter()
  const { bulletinBase64, bulletinFilename, setBulletin } = useDiagnosticStore()
  const [error, setError] = useState<string | null>(null)

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Seul le format PDF est accepté.')
      return
    }
    if (file.size > BULLETIN_MAX_BYTES) {
      setError('Le fichier dépasse 5 Mo. Veuillez le compresser ou choisir un autre fichier.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setBulletin(result.split(',')[1] ?? null, file.name)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-gray-900">Bulletin scolaire (optionnel)</h1>
      <p className="mb-5 text-sm text-gray-600">
        Un bulletin au format PDF permet d&apos;affiner votre profil grâce à l&apos;analyse
        automatique des moyennes et appréciations. Vous pouvez passer cette étape.
      </p>

      <Card>
        <CardContent className="p-5">
          <Label htmlFor="bulletin">Fichier PDF (5 Mo maximum)</Label>
          <input
            id="bulletin"
            type="file"
            accept="application/pdf"
            onChange={onFile}
            className="mt-2 block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {bulletinBase64 && bulletinFilename && (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5">
              <span className="text-sm font-medium text-emerald-800">📄 {bulletinFilename}</span>
              <button
                type="button"
                onClick={() => setBulletin(null, null)}
                className="text-sm text-red-600 hover:underline"
              >
                Retirer
              </button>
            </div>
          )}
          {!bulletinBase64 && bulletinFilename && (
            <p className="mt-3 text-sm text-amber-700">
              Le fichier « {bulletinFilename} » doit être resélectionné (il n&apos;est pas conservé
              entre deux visites pour des raisons de confidentialité).
            </p>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={() => router.push('/diagnostic/examens')}>
          ← Retour
        </Button>
        <Button onClick={() => router.push('/diagnostic/recap')}>
          {bulletinBase64 ? 'Récapitulatif →' : 'Passer cette étape →'}
        </Button>
      </div>
    </div>
  )
}
