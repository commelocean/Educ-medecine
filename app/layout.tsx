import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import NavUser from '@/components/NavUser'
import SiteFooter from '@/components/SiteFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Médecine Top 7% — Diagnostic neuropédagogique PASS / L.AS',
  description:
    'Diagnostic neuropédagogique personnalisé pour les étudiants en PASS / L.AS : profil d’apprentissage, planning en répétition espacée et conseils stratégiques.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <a href="#contenu" className="skip-link rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-soft-lg">
          Aller au contenu
        </a>
        <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg transition-opacity hover:opacity-80"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-soft">
                  <span className="text-sm font-bold text-white">M7</span>
                </div>
                <span className="hidden font-bold tracking-tight text-gray-900 sm:block">
                  Médecine Top 7%
                </span>
              </Link>
              <NavUser />
            </div>
          </div>
        </nav>
        <main id="contenu" className="flex-1 bg-gray-50">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
