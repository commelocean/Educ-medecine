import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/onboarding', '/diagnostic', '/eleve', '/admin', '/compte']

// Détection légère de session : présence d'un cookie d'auth Supabase
// (sb-<ref>-auth-token, éventuellement découpé en .0/.1…). On NE valide PAS
// le jeton ici — la vraie protection est côté serveur (RLS) et chaque page
// re-vérifie l'authentification. Objectif : simple redirection UX.
//
// Volontairement SANS dépendance (pas de SDK Supabase) : le middleware tourne
// sur le runtime Edge de Vercel, où l'initialisation du client Supabase peut
// échouer (MIDDLEWARE_INVOCATION_FAILED). Ici, aucune dépendance ni appel
// réseau ⇒ impossible de planter.
function hasAuthCookie(request: NextRequest): boolean {
  return request.cookies
    .getAll()
    .some((c) => c.name.startsWith('sb-') && c.name.includes('auth-token'))
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authed = hasAuthCookie(request)
  const isProtected = PROTECTED_PREFIXES.some((p) => path.startsWith(p))

  if (isProtected && !authed) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('next', path)
    return NextResponse.redirect(url)
  }

  if (path === '/auth' && authed) {
    const url = request.nextUrl.clone()
    url.pathname = request.nextUrl.searchParams.get('next') || '/onboarding'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
