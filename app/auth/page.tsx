'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function ageFromDate(dateNaissance: string): number {
  const d = new Date(dateNaissance)
  const now = new Date()
  let age = now.getFullYear() - d.getFullYear()
  const m = now.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--
  return age
}

function AuthForm() {
  const router = useRouter()
  const params = useSearchParams()
  const supabase = createClient()

  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [dateNaissance, setDateNaissance] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [consentement, setConsentement] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const estMineur = dateNaissance !== '' && ageFromDate(dateNaissance) < 18

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'signup') {
        if (estMineur && (!parentEmail || !consentement)) {
          setError(
            "Vous êtes mineur(e) : l'email d'un parent et son consentement sont obligatoires."
          )
          setLoading(false)
          return
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              prenom,
              nom,
              date_naissance: dateNaissance,
              parent_email: estMineur ? parentEmail : null,
              consentement_parental: estMineur ? consentement : null,
            },
          },
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
      router.push(params.get('next') || '/onboarding')
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message === 'Invalid login credentials'
            ? 'Email ou mot de passe incorrect.'
            : err.message
          : 'Une erreur est survenue. Veuillez réessayer.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{mode === 'login' ? 'Connexion' : 'Créer un compte'}</CardTitle>
          <CardDescription>
            {mode === 'login'
              ? 'Accédez à votre diagnostic et à votre planning personnalisé.'
              : 'Quelques informations pour démarrer votre diagnostic.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input id="prenom" required value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" required value={nom} onChange={(e) => setNom(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dn">Date de naissance</Label>
                  <Input
                    id="dn"
                    type="date"
                    required
                    value={dateNaissance}
                    onChange={(e) => setDateNaissance(e.target.value)}
                  />
                </div>
                {estMineur && (
                  <div className="space-y-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm font-medium text-amber-800">
                      Vous êtes mineur(e) : le consentement d&apos;un parent est requis.
                    </p>
                    <div className="space-y-1.5">
                      <Label htmlFor="pe">Email du parent / tuteur légal</Label>
                      <Input
                        id="pe"
                        type="email"
                        required
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                      />
                    </div>
                    <label className="flex items-start gap-2 text-sm text-amber-900">
                      <input
                        type="checkbox"
                        required
                        checked={consentement}
                        onChange={(e) => setConsentement(e.target.checked)}
                        className="mt-0.5"
                      />
                      Mon parent / tuteur légal consent à mon inscription et au traitement de mes
                      données dans le cadre de ce service.
                    </label>
                  </div>
                )}
              </>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pw">Mot de passe</Label>
              <Input
                id="pw"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Veuillez patienter…' : mode === 'login' ? 'Se connecter' : "S'inscrire"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            {mode === 'login' ? (
              <>
                Pas encore de compte ?{' '}
                <button className="font-medium text-indigo-600 hover:underline" onClick={() => setMode('signup')}>
                  Créer un compte
                </button>
              </>
            ) : (
              <>
                Déjà inscrit(e) ?{' '}
                <button className="font-medium text-indigo-600 hover:underline" onClick={() => setMode('login')}>
                  Se connecter
                </button>
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  )
}
