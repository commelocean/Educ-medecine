import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Educ Médecine — Diagnostic Neuropédagogique',
  description: 'Optimisez votre apprentissage avec un diagnostic neuropédagogique personnalisé',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EM</span>
                </div>
                <span className="font-bold text-gray-900 hidden sm:block">Educ Médecine</span>
              </Link>
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                  Dashboard
                </Link>
                <Link href="/formulaire" className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Commencer
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
