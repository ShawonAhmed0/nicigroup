import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isBengali = pathname === '/bn' || pathname.startsWith('/bn/')
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('x-nici-locale', isBengali ? 'bn' : 'en')
  requestHeaders.set('x-nici-pathname', pathname)

  if (isBengali) {
    const destination = request.nextUrl.clone()
    destination.pathname = pathname === '/bn' ? '/' : pathname.slice(3)
    return NextResponse.rewrite(destination, { request: { headers: requestHeaders } })
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!api|admin|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\..*).*)'],
}
