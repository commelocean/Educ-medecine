import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/config'
import { IDENTITY_QUESTIONS } from '@/lib/questions'

export const maxDuration = 180

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!accessToken) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  })
  const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)

  if (!user || authError) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 })
  }

  const webhookUrl =
    process.env.N8N_WEBHOOK_URL ??
    'https://n8n-formation.isao.io/webhook/88f8f497-48ed-4925-904a-8fa0d9ab3250'

  let body: {
    reponses: Record<string, 'OUI' | 'NON'>
    emploi_du_temps: Record<string, string>
    dates_examens: string[]
    volume_chapitres_jour: string
    duree_transport: string
    bulletin_base64: string | null
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 })
  }

  const manquantes = IDENTITY_QUESTIONS.filter((q) => !body.reponses?.[q.id])
  if (manquantes.length > 0) {
    return NextResponse.json(
      { error: `Réponses manquantes : ${manquantes.map((q) => q.id).join(', ')}` },
      { status: 400 }
    )
  }
  if (
    !Array.isArray(body.dates_examens) ||
    body.dates_examens.length === 0 ||
    !body.dates_examens.every((d) => ISO_DATE.test(d))
  ) {
    return NextResponse.json(
      { error: 'Les dates d'examens doivent être au format YYYY-MM-DD.' },
      { status: 400 }
    )
  }

  // Génère l'ID côté app — n8n doit l'utiliser comme PK de la ligne questionnaire.
  // Cela évite de dépendre du champ questionnaire_id dans la réponse n8n.
  const questionnaire_id = crypto.randomUUID()

  const meta = (user.user_metadata ?? {}) as Record<string, string>
  const payload = {
    questionnaire_id,
    eleve: {
      prenom: meta.prenom ?? '',
      nom: meta.nom ?? '',
      email: user.email,
      date_naissance: meta.date_naissance ?? null,
    },
    reponses: IDENTITY_QUESTIONS.map((q) => ({
      question_id: q.id,
      groupe: q.groupe,
      reponse: body.reponses[q.id],
    })),
    emploi_du_temps: body.emploi_du_temps ?? {},
    dates_examens: body.dates_examens,
    volume_chapitres_jour: body.volume_chapitres_jour ?? '',
    duree_transport: body.duree_transport ?? '',
    bulletin_base64: body.bulletin_base64 ?? null,
    source_mode: process.env.SOURCE_MODE ?? 'production',
  }

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (process.env.N8N_WEBHOOK_SECRET) {
      headers['x-webhook-secret'] = process.env.N8N_WEBHOOK_SECRET
    }
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(150_000),
    })

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '')
      console.error('n8n webhook error', upstream.status, text)
      return NextResponse.json(
        { error: `Le moteur de diagnostic est indisponible (HTTP ${upstream.status}).` },
        { status: 502 }
      )
    }

    // On renvoie l'ID pré-généré sans dépendre du corps de la réponse n8n.
    // n8n doit utiliser payload.questionnaire_id comme PK de la ligne questionnaire.
    return NextResponse.json({ questionnaire_id, status: 'ok' })
  } catch (err) {
    console.error('n8n webhook failure', err)
    return NextResponse.json(
      { error: 'Impossible de joindre le moteur de diagnostic.' },
      { status: 502 }
    )
  }
}
