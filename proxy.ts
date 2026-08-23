import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const pathname = request.nextUrl.pathname
  requestHeaders.delete('x-unitalk-route-lang')

  if (pathname.length > 1 && pathname.endsWith('.')) {
    const target = request.nextUrl.clone()
    target.pathname = pathname.replace(/\.+$/, '')
    return NextResponse.redirect(target, 308)
  }

  requestHeaders.set('x-unitalk-route-lang', pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr')

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
