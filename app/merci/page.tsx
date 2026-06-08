import Link from 'next/link'

export default function MerciPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-8">
          ✅
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Questionnaire envoyé !
        </h1>
        <p className="text-gray-600 mb-4">
          Votre diagnostic neuropédagogique est en cours de traitement. L\'analyse IA génère votre profil d\'identité, votre cartographie VAK et votre planning personnalisé.
        </p>
        <p className="text-gray-500 text-sm mb-10">
          Ce processus prend généralement quelques minutes. Vous pouvez consulter votre profil sur le dashboard dès qu\'il est disponible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors">
            Voir le dashboard
          </Link>
          <Link href="/" className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:border-gray-400 transition-colors">
            Retour à l\'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
