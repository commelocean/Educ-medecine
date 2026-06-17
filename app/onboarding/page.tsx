import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DUREE_ESTIMEE } from '@/lib/constants'

const ETAPES = [
  { titre: '48 questions OUI / NON', desc: 'Répondez spontanément, sans trop réfléchir : il n’y a pas de bonne ou de mauvaise réponse.' },
  { titre: 'Votre emploi du temps', desc: 'Cours, sport, loisirs, repas et sommeil : nous construisons votre planning autour de votre vie réelle.' },
  { titre: 'Vos dates d’examens', desc: 'Sélectionnez les dates précises de vos concours pour caler la répétition espacée (J0 → J60).' },
  { titre: 'Votre bulletin (optionnel)', desc: 'Un PDF de bulletin scolaire affine votre profil grâce à l’analyse automatique des appréciations.' },
]

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="animate-fade-up text-3xl font-bold tracking-tight text-gray-900">
        Avant de commencer
      </h1>
      <p className="mt-2 animate-fade-up text-gray-600 anim-delay-75">
        Le diagnostic dure <strong>{DUREE_ESTIMEE.toLowerCase()}</strong>. Vos réponses sont
        sauvegardées automatiquement : vous pouvez quitter et reprendre à tout moment.
      </p>

      <div className="mt-8 space-y-4">
        {ETAPES.map((e, i) => (
          <Card
            key={e.titre}
            className="animate-fade-up hover:shadow-soft"
            style={{ animationDelay: `${100 + i * 75}ms` }}
          >
            <CardContent className="flex items-start gap-4 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-semibold text-white shadow-soft">
                {i + 1}
              </span>
              <div>
                <h2 className="font-semibold text-gray-900">{e.titre}</h2>
                <p className="mt-1 text-sm text-gray-600">{e.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/diagnostic/questions">
          <Button size="lg" className="w-full sm:w-auto">
            Commencer le diagnostic →
          </Button>
        </Link>
        <p className="mt-3 text-sm text-gray-500">{DUREE_ESTIMEE} · Sauvegarde automatique</p>
      </div>
    </div>
  )
}
