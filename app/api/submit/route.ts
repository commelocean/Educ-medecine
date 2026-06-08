import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: 'N8N_WEBHOOK_URL not configured' }, { status: 500 })
  }

  let body: FormData
  try {
    body = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      body,
    })

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => 'no body')
      console.error('n8n error:', upstream.status, text)
      return NextResponse.json({ error: 'Upstream error', detail: text }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('fetch error:', err)
    return NextResponse.json({ error: 'Network error' }, { status: 503 })
  }
}
