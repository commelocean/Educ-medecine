import Link from 'next/link'

const PROFILS = [
  { name: 'Perfectionniste', emoji: '🎯', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', desc: 'Rigoureux, organisé, attentif aux détails' },
  { name: 'Aimable', emoji: '🤝', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', desc: 'Empathique, coopératif, besoin d’harmonie' },
  { name: 'Dynamique', emoji: '⚡', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', desc: 'Actif, compétitif, orienté résultats' },
  { name: 'Rebelle', emoji: '🔥', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', desc: 'Indépendant, anticonformiste, créatif' },
  { name: 'Intellectuel', emoji: '🧠', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', desc: 'Analytique, introverti, curieux' },
  { name: 'Enthousiaste', emoji: '✨', bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', desc: 'Créatif, spontané, multitâche' },
  { name: 'Émotionnel', emoji: '💜', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', desc: 'Sensible, esthète, expressif' },
]

const STATS = [
  { value: '48', label: 'questions ciblées' },
  { value: '7', label: 'profils d’identité' },
  { value: '3', label: 'canaux d’apprentissage (VAK)' },
  { value: 'J0→J60', label: 'répétition espacée' },
]

const ETAPES = [
  { step: '01', title: 'Questionnaire', desc: '48 questions sur votre personnalité, vos habitudes et votre emploi du temps.', icon: '📝' },
  { step: '02', title: 'Analyse', desc: 'Calcul de vos scores d’identité (7 profils) et de votre canal d’apprentissage VAK.', icon: '🧬' },
  { step: '03', title: 'Profil généré', desc: 'Synthèse narrative personnalisée, forces, axes d’amélioration et conseils stratégiques.', icon: '📊' },
  { step: '04', title: 'Planning sur mesure', desc: 'Emploi du temps hebdomadaire avec révisions espacées J0 → J60 adaptées à votre profil.', icon: '📅' },
]

const METHODE = [
  { icon: '🧠', title: 'Votre personnalité', desc: 'La méthode des 7 profils (J.-F. Michel) identifie ce qui vous motive vraiment et comment vous travaillez le mieux.' },
  { icon: '👁️', title: 'Votre canal d’apprentissage', desc: 'Visuel, auditif ou kinesthésique : on détermine le canal qui ancre le plus durablement vos connaissances.' },
  { icon: '🔁', title: 'La répétition espacée', desc: 'Chaque chapitre est replanifié à J0, J1, J7, J14, J30 et J60 pour une mémorisation à long terme.' },
]

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-gradient px-4 py-24 text-white sm:py-32">
        {/* motif de grille + halos décoratifs */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-faint [background-size:40px_40px] opacity-40" />
        <div aria-hidden className="absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <div aria-hidden className="absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl animate-float anim-delay-300" />

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <span>🔬</span> Diagnostic neuropédagogique · PASS / L.AS
          </div>
          <h1 className="animate-fade-up anim-delay-75 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Découvrez comment
            <br />
            <span className="bg-gradient-to-r from-yellow-200 to-amber-300 bg-clip-text text-transparent">
              vous apprenez vraiment
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up anim-delay-150 text-lg text-indigo-100 sm:text-xl">
            En 15-20 minutes, obtenez votre profil d’apprentissage et un planning de révisions
            personnalisé, calé sur vos concours et votre emploi du temps réel.
          </p>
          <div className="mt-10 flex animate-fade-up anim-delay-200 flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/auth"
              className="rounded-xl bg-white px-8 py-4 font-bold text-brand-700 shadow-soft-lg transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              Commencer le diagnostic →
            </Link>
            <Link
              href="/auth"
              className="rounded-xl border-2 border-white/40 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Me connecter
            </Link>
          </div>
          <div className="mt-8 flex animate-fade-up anim-delay-300 flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-indigo-100">
            <span className="inline-flex items-center gap-1.5">✓ 15-20 minutes</span>
            <span className="inline-flex items-center gap-1.5">✓ Sauvegarde automatique</span>
            <span className="inline-flex items-center gap-1.5">✓ 100 % personnalisé</span>
          </div>
        </div>
      </section>

      {/* BANDE DE STATISTIQUES */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <div className="text-3xl font-extrabold tracking-tight text-brand-600 sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMENT ÇA FONCTIONNE */}
      <section className="bg-white px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Comment ça fonctionne ?
          </h2>
          <p className="mt-3 text-center text-gray-500">Un processus en 4 étapes, entièrement guidé</p>
          <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* ligne de connexion sur grand écran */}
            <div aria-hidden className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block" />
            {ETAPES.map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-3xl ring-1 ring-brand-100 transition-transform hover:scale-105">
                  {item.icon}
                </div>
                <div className="mt-4 text-xs font-bold tracking-wider text-brand-500">
                  ÉTAPE {item.step}
                </div>
                <h3 className="mt-1 font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI ÇA MARCHE / MÉTHODE */}
      <section className="bg-gray-50 px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Une méthode, trois leviers
          </h2>
          <p className="mt-3 text-center text-gray-500">
            Votre planning n’est pas générique : il combine qui vous êtes et comment votre mémoire fonctionne.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {METHODE.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                  {m.icon}
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LES 7 PROFILS */}
      <section className="bg-white px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Les 7 profils d’identité
          </h2>
          <p className="mt-3 text-center text-gray-500">
            Méthode des 7 profils d’apprentissage (J.-F. Michel)
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROFILS.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-5 transition-all hover:-translate-y-1 hover:shadow-soft ${p.bg} ${p.border}`}
              >
                <div className="text-3xl">{p.emoji}</div>
                <div className={`mt-2 font-bold ${p.text}`}>{p.name}</div>
                <div className="mt-1 text-sm text-gray-600">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative isolate overflow-hidden bg-brand-gradient px-4 py-20 text-center text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-faint [background-size:40px_40px] opacity-30" />
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Prêt à découvrir votre profil ?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Répondez spontanément : il n’y a pas de bonne ou de mauvaise réponse.
          </p>
          <Link
            href="/auth"
            className="mt-8 inline-block rounded-xl bg-white px-10 py-4 font-bold text-brand-700 shadow-soft-lg transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            Démarrer maintenant →
          </Link>
        </div>
      </section>
    </div>
  )
}
