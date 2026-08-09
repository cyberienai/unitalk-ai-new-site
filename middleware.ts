import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/mock-auth'

// Routes that require a (simulated) session.
// /decouvrir is intentionally PUBLIC: a visitor defines the mission first and
// only signs in at the end of the flow (mission → adapt → connect).
const PROTECTED = ['/workspace']

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  const needsAuth = PROTECTED.some((base) => pathname === base || pathname.startsWith(`${base}/`))
  if (!needsAuth) return NextResponse.next()

  const hasSession = Boolean(req.cookies.get(SESSION_COOKIE)?.value)
  if (hasSession) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = '/connexion'
  url.search = ''
  url.searchParams.set('redirect', `${pathname}${search}`)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/workspace/:path*'],
}
