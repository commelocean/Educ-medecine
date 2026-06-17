import Link from 'next/link'

export default function SiteFooter() {
  const annee = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient shadow-soft">
                <span className="text-sm font-bold text-white">M7</span>
              </div>
              <span className="font-bold text-gray-900">Médecine Top 7%</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
              Diagnostic neuropédagogique pour les étudiants en PASS / L.AS : profil
              d&apos;apprentissage, planning en répétition espacée et conseils stratégiques
              personnalisés.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Le diagnostic</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/onboarding" className="transition-colors hover:text-brand-600">
                  Commencer
                </Link>
              </li>
              <li>
                <Link href="/auth" className="transition-colors hover:text-brand-600">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Confidentialité</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>Données protégées (RGPD)</li>
              <li>Consentement parental pour les mineurs</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-gray-100 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {annee} Médecine Top 7%. Tous droits réservés.</p>
          <p>Méthode des 7 profils (J.-F. Michel) · Répétition espacée J0 → J60</p>
        </div>
      </div>
    </footer>
  )
}
