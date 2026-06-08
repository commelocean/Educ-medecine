'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { IDENTITY_QUESTIONS, SCHEDULE_FIELDS, GROUPE_META } from '@/lib/questions'

type Answers = Record<string, string>

const STEPS = [
  { id: 1, title: 'Informations personnelles', subtitle: 'Quelques informations pour personnaliser votre diagnostic' },
  { id: 2, title: 'Profil · Partie 1/2', subtitle: 'Q01–Q20 · Perfectionniste, Aimable, Dynamique, Rebelle, Intellectuel' },
  { id: 3, title: 'Profil · Partie 2/2', subtitle: 'Q21–Q40 · Enthousiaste, Émotionnel, Visuel, Auditif, Kinesthésique' },
  { id: 4, title: 'Emploi du temps', subtitle: 'Vos créneaux habituels pour un planning sur mesure' },
  { id: 5, title: 'Finalisation', subtitle: 'Bulletin scolaire optionnel et confirmation' },
]

function OuiNon({ qid, value, onChange }: { qid: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-3">
      {['OUI', 'NON'].map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
            value === opt
              ? opt === 'OUI'
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-md scale-105'
                : 'bg-gray-700 border-gray-700 text-white shadow-md scale-105'
              : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function QuestionCard({ q, value, onChange, index }: { q: typeof IDENTITY_QUESTIONS[0]; value: string; onChange: (v: string) => void; index: number }) {
  const meta = GROUPE_META[q.groupe]
  return (
    <div className={`rounded-2xl border-2 p-5 transition-all ${
      value ? (value === 'OUI' ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-200 bg-gray-50/30') : 'border-gray-100 bg-white'
    }`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${meta?.bg} ${meta?.text}`}>
            {index}
          </div>
        </div>
        <div className="flex-1">
          <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${meta?.bg} ${meta?.text}`}>
            <span>{meta?.emoji}</span> {q.groupe}
          </div>
          <p className="text-gray-800 text-sm leading-relaxed">{q.label}</p>
        </div>
      </div>
      <OuiNon qid={q.id} value={value} onChange={onChange} />
    </div>
  )
}

function QuestionSection({ questions, answers, setAnswer }: { questions: typeof IDENTITY_QUESTIONS; answers: Answers; setAnswer: (k: string, v: string) => void }) {
  const groupes = [...new Set(questions.map(q => q.groupe))]
  return (
    <div className="space-y-6 animate-fade-in">
      {groupes.map(groupe => (
        <div key={groupe}>
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>{GROUPE_META[groupe]?.emoji}</span> {groupe}
          </h3>
          <div className="space-y-3">
            {questions.filter(q => q.groupe === groupe).map((q, i) => (
              <QuestionCard
                key={q.id}
                q={q}
                value={answers[q.id] || ''}
                onChange={v => setAnswer(q.id, v)}
                index={parseInt(q.id.replace('Q', ''))}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 transition-colors'
const selectCls = 'w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 transition-colors bg-white'

function StepPersonnel({ answers, setAnswer }: { answers: Answers; setAnswer: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Prénom" required>
          <input className={inputCls} placeholder="Kim" value={answers.prenom || ''} onChange={e => setAnswer('prenom', e.target.value)} />
        </Field>
        <Field label="Nom" required>
          <input className={inputCls} placeholder="Dupont" value={answers.nom || ''} onChange={e => setAnswer('nom', e.target.value)} />
        </Field>
      </div>
      <Field label="Email" required>
        <input className={inputCls} type="email" placeholder="kim@exemple.fr" value={answers.email || ''} onChange={e => setAnswer('email', e.target.value)} />
      </Field>
      <Field label="Date de naissance">
        <input className={inputCls} type="date" value={answers.date_naissance || ''} onChange={e => setAnswer('date_naissance', e.target.value)} />
      </Field>
      <div className="border-t border-gray-100 pt-5">
        <h3 className="font-bold text-gray-700 mb-4">📅 Informations sur les examens</h3>
        <div className="space-y-5">
          <Field label="Dates précises des examens / concours" required>
            <textarea
              className={`${inputCls} resize-none`}
              rows={2}
              placeholder="ex: 2026-06-15, 2026-06-22"
              value={answers.Q46 || ''}
              onChange={e => setAnswer('Q46', e.target.value)}
            />
          </Field>
          <Field label="Volume moyen de chapitres par jour" required>
            <select className={selectCls} value={answers.Q47 || ''} onChange={e => setAnswer('Q47', e.target.value)}>
              <option value="">-- Sélectionner --</option>
              {['1 cours', '2 cours', '3 cours', '4 cours ou plus'].map(o => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Durée quotidienne de transports" required>
            <select className={selectCls} value={answers.Q48 || ''} onChange={e => setAnswer('Q48', e.target.value)}>
              <option value="">-- Sélectionner --</option>
              {['Moins de 30 min', '30 min à 1h', '1 à 2h', 'Plus de 2h'].map(o => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>
      </div>
    </div>
  )
}

function StepSchedule({ answers, setAnswer }: { answers: Answers; setAnswer: (k: string, v: string) => void }) {
  const groups = [
    { title: '🏫 Cours', fields: ['Q41', 'Q41a', 'Q41b'] },
    { title: '🏋️ Sport', fields: ['Q42', 'Q42a'] },
    { title: '🎨 Loisirs', fields: ['Q43', 'Q43a'] },
    { title: '💤 Sommeil (semaine)', fields: ['Q44a', 'Q44b'] },
    { title: '💤 Sommeil (week-end)', fields: ['Q44c', 'Q44d'] },
    { title: '🍽️ Repas', fields: ['Q45a', 'Q45b', 'Q45c'] },
  ]
  return (
    <div className="space-y-6 animate-fade-in">
      {groups.map(g => (
        <div key={g.title} className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-700 mb-4">{g.title}</h3>
          <div className="space-y-4">
            {g.fields.map(fid => {
              const f = SCHEDULE_FIELDS.find(x => x.id === fid)
              if (!f) return null
              return (
                <Field key={f.id} label={f.label} required={f.required}>
                  {f.type === 'dropdown' ? (
                    <select className={selectCls} value={answers[f.id] || ''} onChange={e => setAnswer(f.id, e.target.value)}>
                      <option value="">-- Sélectionner --</option>
                      {f.options?.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <textarea className={`${inputCls} resize-none`} rows={2} value={answers[f.id] || ''} onChange={e => setAnswer(f.id, e.target.value)} />
                  )}
                </Field>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function StepFinalisation({
  answers, fileRef, onSubmit, isSubmitting, error
}: {
  answers: Answers
  fileRef: React.RefObject<HTMLInputElement>
  onSubmit: () => void
  isSubmitting: boolean
  error: string | null
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-700 mb-2">📚 Bulletin scolaire (optionnel)</h3>
        <p className="text-sm text-gray-500 mb-4">Téléversez votre bulletin en PDF pour enrichir l\'analyse avec vos résultats académiques.</p>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
        <h3 className="font-bold text-gray-800 mb-3">📋 Récapitulatif</h3>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-500">Nom :</span> <span className="font-semibold">{answers.prenom} {answers.nom}</span></div>
          <div><span className="text-gray-500">Email :</span> <span className="font-semibold">{answers.email}</span></div>
          <div><span className="text-gray-500">Chapitres/jour :</span> <span className="font-semibold">{answers.Q47}</span></div>
          <div><span className="text-gray-500">Transport :</span> <span className="font-semibold">{answers.Q48}</span></div>
          <div className="sm:col-span-2"><span className="text-gray-500">Examens :</span> <span className="font-semibold">{answers.Q46}</span></div>
        </div>
        <div className="mt-3 pt-3 border-t border-indigo-100">
          <span className="text-gray-500 text-sm">Questions répondues :</span>
          <span className="ml-2 font-bold text-indigo-700">{Object.keys(answers).filter(k => k.startsWith('Q0') || k.startsWith('Q1') || k.startsWith('Q2') || k.startsWith('Q3')).length} / 40</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-lg"
      >
        {isSubmitting ? '⏳ Envoi en cours...' : 'Envoyer mon diagnostic →'}
      </button>
    </div>
  )
}

export default function FormulairePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const setAnswer = (key: string, value: string) =>
    setAnswers(prev => ({ ...prev, [key]: value }))

  const validateStep = (): boolean => {
    if (step === 1) return !!(answers.prenom && answers.nom && answers.email && answers.Q46 && answers.Q47 && answers.Q48)
    if (step === 2) return IDENTITY_QUESTIONS.slice(0, 20).every(q => answers[q.id])
    if (step === 3) return IDENTITY_QUESTIONS.slice(20).every(q => answers[q.id])
    if (step === 4) return !!(answers.Q41 && answers.Q44a && answers.Q44b)
    return true
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    const fd = new FormData()
    fd.append('Prénom', answers.prenom || '')
    fd.append('Nom', answers.nom || '')
    fd.append('Email', answers.email || '')
    if (answers.date_naissance) fd.append('Date de naissance', answers.date_naissance)
    for (const q of IDENTITY_QUESTIONS) fd.append(q.n8nKey, answers[q.id] || 'NON')
    for (const f of SCHEDULE_FIELDS) if (answers[f.id]) fd.append(f.n8nKey, answers[f.id])
    const file = fileRef.current?.files?.[0]
    if (file) fd.append('Bulletin scolaire (PDF — sera analysé par OCR)', file, file.name)
    try {
      const res = await fetch('/api/submit', { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || `HTTP ${res.status}`)
      router.push('/merci')
    } catch (e: unknown) {
      setError(`Erreur lors de l\'envoi : ${e instanceof Error ? e.message : 'inconnue'}. Veuillez réessayer.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = validateStep()
  const progress = ((step - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Étape {step}/{STEPS.length}</div>
              <div className="font-bold text-gray-900">{STEPS[step - 1].title}</div>
              <div className="text-xs text-gray-500">{STEPS[step - 1].subtitle}</div>
            </div>
            <div className="text-3xl font-extrabold text-indigo-600">{Math.round(progress)}%</div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {step === 1 && <StepPersonnel answers={answers} setAnswer={setAnswer} />}
        {step === 2 && <QuestionSection questions={IDENTITY_QUESTIONS.slice(0, 20)} answers={answers} setAnswer={setAnswer} />}
        {step === 3 && <QuestionSection questions={IDENTITY_QUESTIONS.slice(20)} answers={answers} setAnswer={setAnswer} />}
        {step === 4 && <StepSchedule answers={answers} setAnswer={setAnswer} />}
        {step === 5 && (
          <StepFinalisation
            answers={answers}
            fileRef={fileRef}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={error}
          />
        )}

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-gray-300 transition-colors"
            >
              ← Précédent
            </button>
          ) : <div />}
          {step < STEPS.length && (
            <button
              onClick={() => { if (isValid) setStep(s => s + 1) }}
              disabled={!isValid}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                isValid
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Suivant →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
