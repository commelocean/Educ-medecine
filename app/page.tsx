import Link from 'next/link'

const PROFILS = [
  { name: 'Perfectionniste', emoji: '🎯', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', desc: 'Rigoureux, organisé, attentif aux détails' },
  { name: 'Aimable',         emoji: '🤝', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', desc: 'Empathique, coopératif, besoin d\'harmonie' },
  { name: 'Dynamique',       emoji: '⚡',    bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   desc: 'Actif, compétitif, orienté résultats' },
  { name: 'Rebelle',         emoji: '🔥',   bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     desc: 'Indépendant, anticonformiste, créatif' },
  { name: 'Intellectuel',    emoji: '🧠',   bg: 'bg-purple-50',  border: 'border-purple-200',  text: 'text-purple-700',  desc: 'Analytique, introverti, curieux' },
  { name: 'Enthousiaste',    emoji: '✨',    bg: 'bg-pink-50',    border: 'border-pink-200',    text: 'text-pink-700',    desc: 'Créatif, spontané, multitâche' },
  { name: 'Émotionnel',      emoji: '💜',   bg: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-700',  desc: 'Sensible, esthète, expressif' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full mb-8">
            <span>🔬</span> Diagnostic Neuropédagogique · Module 1
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Découvrez comment<br />
            <span className="text-yellow-300">vous apprenez vraiment</span>
          </h1>
          <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
            48 questions · 15-20 minutes · Un planning personnalisé adapté à votre profil de personnalité et à votre style d'apprentissage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/formulaire" className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl">
              Commencer le diagnostic →
            </Link>
            <Link href="/dashboard" className="border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors">
              Voir les profils existants
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Comment ça fonctionne ?</h2>
          <p className="text-center text-gray-500 mb-12">Un processus en 4 étapes, entièrement automatisé</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Questionnaire', desc: '48 questions sur votre personnalité, vos habitudes et votre emploi du temps', icon: '📝' },
              { step: '02', title: 'Analyse IA',    desc: 'Calcul de vos scores d\'identité (7 profils) et de votre canal d\'apprentissage VAK', icon: '🤖' },
              { step: '03', title: 'Profil généré', desc: 'Synthèse narrative personnalisée, forces, axes d\'amélioration et conseils stratégiques', icon: '📊' },
              { step: '04', title: 'Planning sur mesure', desc: 'Emploi du temps hebdomadaire avec révisions espacées J0→J60 adapté à votre profil', icon: '📅' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">{item.icon}</div>
                <div className="text-xs font-bold text-indigo-500 mb-1">ÉTAPE {item.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Les 7 profils d\'identité</h2>
          <p className="text-center text-gray-500 mb-12">Basés sur le modèle Process Communication de Taibi Kahler</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROFILS.map(p => (
              <div key={p.name} className={`border rounded-xl p-4 ${p.bg} ${p.border}`}>
                <div className="text-2xl mb-2">{p.emoji}</div>
                <div className={`font-bold mb-1 ${p.text}`}>{p.name}</div>
                <div className="text-sm text-gray-600">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à découvrir votre profil ?</h2>
        <p className="text-indigo-200 mb-8">Soyez spontané, il n\'y a pas de bonne ou mauvaise réponse.</p>
        <Link href="/formulaire" className="bg-white text-indigo-700 font-bold px-10 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
          Démarrer maintenant →
        </Link>
      </section>
    </div>
  )
}
