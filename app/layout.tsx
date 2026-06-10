import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import NavUser from '@/components/NavUser'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Médecine Top 7% — Diagnostic neuropédagogique PASS / L.AS',
  description:
    'Diagnostic neuropédagogique personnalisé pour les étudiants en PASS / L.AS : profil d’apprentissage, planning en répétition espacée et conseils stratégiques.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                  <span className="text-sm font-bold text-white">M7</span>
                </div>
                <span className="hidden font-bold text-gray-900 sm:block">Médecine Top 7%</span>
              </Link>
              <NavUser />
            </div>
          </div>
        </nav>
        <main className="min-h-[calc(100vh-4rem)] bg-gray-50">{children}</main>
      </body>
    </html>
  )
}
