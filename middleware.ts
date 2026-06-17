import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/config'

const PROTECTED_PREFIXES = ['/onboarding', '/diagnostic', '/eleve', '/admin', '/compte']

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  try {
    const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname
    const isProtected = PROTECTED_PREFIXES.some((p) => path.startsWith(p))

    if (isProtected && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth'
      url.searchParams.set('next', path)
      return NextResponse.redirect(url)
    }

    if (path === '/auth' && user) {
      const url = request.nextUrl.clone()
      url.pathname = request.nextUrl.searchParams.get('next') || '/onboarding'
      url.search = ''
      return NextResponse.redirect(url)
    }

    return response
  } catch (err) {
    // Jamais de 500 sur une page à cause de l'auth : en cas d'erreur
    // (Supabase indisponible, config absente…), on laisse passer la requête.
    // Les pages protégées restent gardées côté client / RLS.
    console.error('middleware: échec non bloquant', err)
    return response
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
