export interface Question {
  id: string
  groupe: string
  label: string
  n8nKey: string
}

export const IDENTITY_QUESTIONS: Question[] = [
  { id: 'Q01', groupe: 'Perfectionniste', label: 'Une étiquette de travers ou un cadre mal aligné me donne immédiatement envie de le corriger.', n8nKey: 'Q01 (Perfectionniste) — Une étiquette de travers ou un cadre mal aligné me donne immédiatement envie de le corriger.' },
  { id: 'Q02', groupe: 'Perfectionniste', label: "Je préfère suivre minutieusement une recette de cuisine étape par étape plutôt que d'improviser.", n8nKey: "Q02 (Perfectionniste) — Je préfère suivre minutieusement une recette de cuisine étape par étape plutôt que d'improviser." },
  { id: 'Q03', groupe: 'Perfectionniste', label: "Je mets beaucoup plus de temps que les autres pour terminer une corvée car je veux qu'elle soit irréprochable.", n8nKey: "Q03 (Perfectionniste) — Je mets beaucoup plus de temps que les autres pour terminer une corvée car je veux qu'elle soit irréprochable." },
  { id: 'Q04', groupe: 'Perfectionniste', label: "Je trouve agaçant qu'un proche modifie les règles d'un jeu de société en plein milieu de la partie.", n8nKey: "Q04 (Perfectionniste) — Je trouve agaçant qu'un proche modifie les règles d'un jeu de société en plein milieu de la partie." },
  { id: 'Q05', groupe: 'Aimable', label: "S'il y a une mauvaise ambiance ou une tension dans une pièce, je me sens bloqué et j'évite de parler.", n8nKey: "Q05 (Aimable) — S'il y a une mauvaise ambiance ou une tension dans une pièce, je me sens bloqué et j'évite de parler." },
  { id: 'Q06', groupe: 'Aimable', label: "J'accepte régulièrement de rendre service, même si cela bouscule mes plans ou me fatigue.", n8nKey: "Q06 (Aimable) — J'accepte régulièrement de rendre service, même si cela bouscule mes plans ou me fatigue." },
  { id: 'Q07', groupe: 'Aimable', label: "J'ai un besoin important de l'approbation ou des compliments de mes proches pour me sentir serein.", n8nKey: "Q07 (Aimable) — J'ai un besoin important de l'approbation ou des compliments de mes proches pour me sentir serein." },
  { id: 'Q08', groupe: 'Aimable', label: "Je préfère un jeu coopératif où tout le monde gagne ensemble plutôt qu'un jeu d'affrontement individuel.", n8nKey: "Q08 (Aimable) — Je préfère un jeu coopératif où tout le monde gagne ensemble plutôt qu'un jeu d'affrontement individuel." },
  { id: 'Q09', groupe: 'Dynamique', label: "L'idée d'un défi, d'un challenge ou d'un concours amical me motive instantanément à agir.", n8nKey: "Q09 (Dynamique) — L'idée d'un défi, d'un challenge ou d'un concours amical me motive instantanément à agir." },
  { id: 'Q10', groupe: 'Dynamique', label: "Face à un nouvel appareil, je préfère le tester directement plutôt que de lire son manuel d'utilisation.", n8nKey: "Q10 (Dynamique) — Face à un nouvel appareil, je préfère le tester directement plutôt que de lire son manuel d'utilisation." },
  { id: 'Q11', groupe: 'Dynamique', label: "J'adore raconter mes réussites et j'apprécie grandement d'être valorisé publiquement pour mes performances.", n8nKey: "Q11 (Dynamique) — J'adore raconter mes réussites et j'apprécie grandement d'être valorisé publiquement pour mes performances." },
  { id: 'Q12', groupe: 'Dynamique', label: "Je perds très vite patience si je ne vois pas l'utilité concrète ou le but immédiat d'une tâche demandée.", n8nKey: "Q12 (Dynamique) — Je perds très vite patience si je ne vois pas l'utilité concrète ou le but immédiat d'une tâche demandée." },
  { id: 'Q13', groupe: 'Rebelle', label: "Si une consigne ou une interdiction me paraît absurde ou injustifiée, mon premier réflexe est de l'ignorer.", n8nKey: "Q13 (Rebelle) — Si une consigne ou une interdiction me paraît absurde ou injustifiée, mon premier réflexe est de l'ignorer." },
  { id: 'Q14', groupe: 'Rebelle', label: 'Je déteste montrer mes doutes, mes moments de tristesse ou mes faiblesses à mon entourage.', n8nKey: 'Q14 (Rebelle) — Je déteste montrer mes doutes, mes moments de tristesse ou mes faiblesses à mon entourage.' },
  { id: 'Q15', groupe: 'Rebelle', label: "J'adore provoquer de petites discussions animées ou des débats juste pour bousculer les idées reçues.", n8nKey: "Q15 (Rebelle) — J'adore provoquer de petites discussions animées ou des débats juste pour bousculer les idées reçues." },
  { id: 'Q16', groupe: 'Rebelle', label: "Je n'accorde mon respect et ma confiance à quelqu'un qu'après qu'il a prouvé qu'il pouvait me tenir tête.", n8nKey: "Q16 (Rebelle) — Je n'accorde mon respect et ma confiance à quelqu'un qu'après qu'il a prouvé qu'il pouvait me tenir tête." },
  { id: 'Q17', groupe: 'Intellectuel', label: "J'adore passer du temps à chercher l'explication logique de phénomènes ou d'énigmes complexes.", n8nKey: "Q17 (Intellectuel) — J'adore passer du temps à chercher l'explication logique de phénomènes ou d'énigmes complexes." },
  { id: 'Q18', groupe: 'Intellectuel', label: "Après avoir passé du temps au milieu d'une foule, j'ai besoin de m'isoler dans le calme pour récupérer.", n8nKey: "Q18 (Intellectuel) — Après avoir passé du temps au milieu d'une foule, j'ai besoin de m'isoler dans le calme pour récupérer." },
  { id: 'Q19', groupe: 'Intellectuel', label: "Je préfère observer silencieusement les discussions en groupe plutôt que d'intervenir spontanément.", n8nKey: "Q19 (Intellectuel) — Je préfère observer silencieusement les discussions en groupe plutôt que d'intervenir spontanément." },
  { id: 'Q20', groupe: 'Intellectuel', label: 'Parler de mes émotions ou de mes sentiments intimes avec les autres me met très mal à l\'aise.', n8nKey: 'Q20 (Intellectuel) — Parler de mes émotions ou de mes sentiments intimes avec les autres me met très mal à l\'aise.' },
  { id: 'Q21', groupe: 'Enthousiaste', label: "J'adore commencer de nouveaux projets passionnants, mais je m'en lasse vite et les laisse souvent inachevés.", n8nKey: "Q21 (Enthousiaste) — J'adore commencer de nouveaux projets passionnants, mais je m'en lasse vite et les laisse souvent inachevés." },
  { id: 'Q22', groupe: 'Enthousiaste', label: "J'ai un besoin vital de liberté ; être enfermé dans une routine répétitive m'étouffe très rapidement.", n8nKey: "Q22 (Enthousiaste) — J'ai un besoin vital de liberté ; être enfermé dans une routine répétitive m'étouffe très rapidement." },
  { id: 'Q23', groupe: 'Enthousiaste', label: 'Je cherche constamment à transformer mes tâches ménagères ou mes corvées quotidiennes en activités amusantes.', n8nKey: 'Q23 (Enthousiaste) — Je cherche constamment à transformer mes tâches ménagères ou mes corvées quotidiennes en activités amusantes.' },
  { id: 'Q24', groupe: 'Enthousiaste', label: "J'utilise très fréquemment l'humour, l'autodérision ou les plaisanteries pour détendre l'atmosphère.", n8nKey: "Q24 (Enthousiaste) — J'utilise très fréquemment l'humour, l'autodérision ou les plaisanteries pour détendre l'atmosphère." },
  { id: 'Q25', groupe: 'Émotionnel', label: "Mon niveau d'énergie et de motivation pour accomplir mes tâches dépend entièrement de mon humeur.", n8nKey: "Q25 (Émotionnel) — Mon niveau d'énergie et de motivation pour accomplir mes tâches dépend entièrement de mon humeur." },
  { id: 'Q26', groupe: 'Émotionnel', label: "J'accorde une importance capitale à l'esthétique, au style et à l'harmonie des lieux où je me trouve.", n8nKey: "Q26 (Émotionnel) — J'accorde une importance capitale à l'esthétique, au style et à l'harmonie des lieux où je me trouve." },
  { id: 'Q27', groupe: 'Émotionnel', label: "J'aime me démarquer des autres par mes choix originaux (vêtements, passions, opinions atypiques).", n8nKey: "Q27 (Émotionnel) — J'aime me démarquer des autres par mes choix originaux (vêtements, passions, opinions atypiques)." },
  { id: 'Q28', groupe: 'Émotionnel', label: "Un reproche ou une remarque critique d'un ami me touche profondément et me préoccupe pendant des jours.", n8nKey: "Q28 (Émotionnel) — Un reproche ou une remarque critique d'un ami me touche profondément et me préoccupe pendant des jours." },
  { id: 'Q29', groupe: 'Visuel', label: 'Quand je me remémore un événement, ce sont les visages, les décors ou les couleurs qui me reviennent en premier.', n8nKey: 'Q29 (Visuel) — Quand je me remémore un événement, ce sont les visages, les décors ou les couleurs qui me reviennent en premier.' },
  { id: 'Q30', groupe: 'Visuel', label: 'Pour me rendre dans un lieu inconnu, je préfère regarder un plan graphique plutôt que de suivre des indications textuelles.', n8nKey: 'Q30 (Visuel) — Pour me rendre dans un lieu inconnu, je préfère regarder un plan graphique plutôt que de suivre des indications textuelles.' },
  { id: 'Q31', groupe: 'Visuel', label: "Je retiens beaucoup plus facilement le nom d'une marque si je vois son logo ou s'il est écrit noir sur blanc.", n8nKey: "Q31 (Visuel) — Je retiens beaucoup plus facilement le nom d'une marque si je vois son logo ou s'il est écrit noir sur blanc." },
  { id: 'Q32', groupe: 'Visuel', label: "J'adore organiser mes notes personnelles avec des couleurs différentes, des flèches et de petits schémas.", n8nKey: "Q32 (Visuel) — J'adore organiser mes notes personnelles avec des couleurs différentes, des flèches et de petits schémas." },
  { id: 'Q33', groupe: 'Auditif', label: "Je me rappelle sans difficulté les mots précis prononcés par un ami et l'intonation exacte de sa voix.", n8nKey: "Q33 (Auditif) — Je me rappelle sans difficulté les mots précis prononcés par un ami et l'intonation exacte de sa voix." },
  { id: 'Q34', groupe: 'Auditif', label: "J'ai régulièrement besoin de me parler à voix haute ou à voix basse pour structurer mes idées.", n8nKey: "Q34 (Auditif) — J'ai régulièrement besoin de me parler à voix haute ou à voix basse pour structurer mes idées." },
  { id: 'Q35', groupe: 'Auditif', label: "Je suis particulièrement perturbé lorsque je lis ou réfléchis s'il y a un bruit de fond ou des discussions à côté.", n8nKey: "Q35 (Auditif) — Je suis particulièrement perturbé lorsque je lis ou réfléchis s'il y a un bruit de fond ou des discussions à côté." },
  { id: 'Q36', groupe: 'Auditif', label: "Pour m'informer, je préfère écouter des podcasts ou des explications de vive voix plutôt que de lire un long texte.", n8nKey: "Q36 (Auditif) — Pour m'informer, je préfère écouter des podcasts ou des explications de vive voix plutôt que de lire un long texte." },
  { id: 'Q37', groupe: 'Kinesthesique', label: "Pour comprendre le fonctionnement d'un nouvel appareil, je dois le manipuler physiquement et faire des essais.", n8nKey: "Q37 (Kinesthésique) — Pour comprendre le fonctionnement d'un nouvel appareil, je dois le manipuler physiquement et faire des essais." },
  { id: 'Q38', groupe: 'Kinesthesique', label: "J'ai beaucoup de mal à rester assis immobile ; j'ai besoin de marcher, de gesticuler ou de manipuler un objet.", n8nKey: "Q38 (Kinesthésique) — J'ai beaucoup de mal à rester assis immobile ; j'ai besoin de marcher, de gesticuler ou de manipuler un objet." },
  { id: 'Q39', groupe: 'Kinesthesique', label: "Mes souvenirs marquants sont rattachés à des sensations physiques, des odeurs ou à l'ambiance globale du moment.", n8nKey: "Q39 (Kinesthésique) — Mes souvenirs marquants sont rattachés à des sensations physiques, des odeurs ou à l'ambiance globale du moment." },
  { id: 'Q40', groupe: 'Kinesthesique', label: "Je m'exprime tout naturellement en faisant de nombreux gestes avec mes mains pour illustrer mes propos.", n8nKey: "Q40 (Kinesthésique) — Je m'exprime tout naturellement en faisant de nombreux gestes avec mes mains pour illustrer mes propos." },
]

export interface ScheduleField {
  id: string
  label: string
  n8nKey: string
  type: 'dropdown' | 'textarea'
  options?: string[]
  required: boolean
}

export const SCHEDULE_FIELDS: ScheduleField[] = [
  { id: 'Q41', label: 'Jours de cours académiques (lundi matin → samedi midi)', n8nKey: 'Q41 — Jours de cours académiques (cocher, lundi matin → samedi midi uniquement)', type: 'dropdown', options: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi matin'], required: true },
  { id: 'Q41a', label: 'Créneaux cours matinée (08h-12h)', n8nKey: 'Q41a — Créneaux cours matinée (08h-12h)', type: 'dropdown', options: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'], required: false },
  { id: 'Q41b', label: 'Créneaux cours après-midi (13h30-17h30)', n8nKey: 'Q41b — Créneaux cours après-midi (13h30-17h30)', type: 'dropdown', options: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'], required: false },
  { id: 'Q42', label: 'Jours de sport', n8nKey: 'Q42 — Jours de sport', type: 'dropdown', options: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'], required: false },
  { id: 'Q42a', label: 'Créneau sport', n8nKey: 'Q42a — Créneau sport', type: 'dropdown', options: ['Matin (08h-12h)', 'Après-midi (13h30-17h30)', 'Fin de journée (17h30-19h30)'], required: false },
  { id: 'Q43', label: 'Jours de loisirs/détente', n8nKey: 'Q43 — Jours de loisirs/détente', type: 'dropdown', options: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'], required: false },
  { id: 'Q43a', label: 'Créneau loisirs', n8nKey: 'Q43a — Créneau loisirs', type: 'dropdown', options: ['Après-midi (13h30-17h30)', 'Fin de journée (17h30-19h30)', 'Soirée (20h30-22h30)'], required: false },
  { id: 'Q44a', label: 'Heure de réveil semaine', n8nKey: 'Q44a — Heure de réveil semaine', type: 'dropdown', options: ['Avant 06h30', '06h30-07h30', 'Après 07h30'], required: true },
  { id: 'Q44b', label: 'Heure de coucher semaine', n8nKey: 'Q44b — Heure de coucher semaine', type: 'dropdown', options: ['Avant 22h00', '22h00-23h00', 'Après 23h00'], required: true },
  { id: 'Q44c', label: 'Heure de réveil week-end', n8nKey: 'Q44c — Heure de réveil week-end', type: 'dropdown', options: ['Avant 08h00', '08h00-09h30', 'Après 09h30'], required: false },
  { id: 'Q44d', label: 'Heure de coucher week-end', n8nKey: 'Q44d — Heure de coucher week-end', type: 'dropdown', options: ['Avant 23h00', '23h00-00h00', 'Après 00h00'], required: false },
  { id: 'Q45a', label: 'Petit-déjeuner', n8nKey: 'Q45a — Petit-déjeuner', type: 'dropdown', options: ['06h30-07h30', '07h30-08h00', 'Pas de créneau fixe'], required: false },
  { id: 'Q45b', label: 'Déjeuner', n8nKey: 'Q45b — Déjeuner', type: 'dropdown', options: ['11h30-12h30', '12h30-13h30', 'Pas de créneau fixe'], required: false },
  { id: 'Q45c', label: 'Dîner', n8nKey: 'Q45c — Dîner', type: 'dropdown', options: ['18h30-19h30', '19h30-20h30', 'Pas de créneau fixe'], required: false },
  { id: 'Q46', label: 'Dates précises des examens / concours (ex: 2026-06-15, 2026-06-22)', n8nKey: 'Q46 — Dates précises des examens / concours (ex: 2026-06-15, 2026-06-22)', type: 'textarea', required: true },
  { id: 'Q47', label: 'Volume moyen de chapitres par jour', n8nKey: 'Q47 — Volume moyen de chapitres par jour', type: 'dropdown', options: ['1 cours', '2 cours', '3 cours', '4 cours ou plus'], required: true },
  { id: 'Q48', label: 'Durée quotidienne de transports', n8nKey: 'Q48 — Durée quotidienne de transports', type: 'dropdown', options: ['Moins de 30 min', '30 min à 1h', '1 à 2h', 'Plus de 2h'], required: true },
]

export const GROUPE_META: Record<string, { emoji: string; bg: string; border: string; text: string; radar: string }> = {
  Perfectionniste: { emoji: '🎯', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', radar: '#6366F1' },
  Aimable:        { emoji: '🤝', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', radar: '#10B981' },
  Dynamique:      { emoji: '⚡', bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   radar: '#F59E0B' },
  Rebelle:        { emoji: '🔥', bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     radar: '#EF4444' },
  Intellectuel:   { emoji: '🧠', bg: 'bg-purple-50',  border: 'border-purple-200',  text: 'text-purple-700',  radar: '#8B5CF6' },
  Enthousiaste:   { emoji: '✨', bg: 'bg-pink-50',    border: 'border-pink-200',    text: 'text-pink-700',    radar: '#EC4899' },
  'Émotionnel':   { emoji: '💜', bg: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-700',  radar: '#F97316' },
  Visuel:         { emoji: '👁️', bg: 'bg-cyan-50',    border: 'border-cyan-200',    text: 'text-cyan-700',    radar: '#06B6D4' },
  Auditif:        { emoji: '👂', bg: 'bg-violet-50',  border: 'border-violet-200',  text: 'text-violet-700',  radar: '#7C3AED' },
  Kinesthesique:  { emoji: '🤲', bg: 'bg-teal-50',    border: 'border-teal-200',    text: 'text-teal-700',    radar: '#14B8A6' },
}
