import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const privatePaths = ['/manage']
const unAuthPaths = ['/login']
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // pathname: /manage/dashboard
  const isAuth = Boolean(request.cookies.get('accessToken')?.value)
  // If not logged in, access to private paths is not allowed
  if (privatePaths.some((path) => pathname.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Once logged in, access to the login page will no longer be allowed
  if (unAuthPaths.some((path) => pathname.startsWith(path)) && isAuth) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/manage/:path*', '/login'],
}
