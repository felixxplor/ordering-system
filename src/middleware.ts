import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const privatePaths = ['/manage']
const unAuthPaths = ['/login']
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // pathname: /manage/dashboard
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  // If not logged in, access to private paths is not allowed
  if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Once logged in, access to the login page will no longer be allowed
  if (unAuthPaths.some((path) => pathname.startsWith(path)) && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // In the case where the user is already logged in, but the access token has expired
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken && refreshToken) {
    const url = new URL('/logout', request.url)
    url.searchParams.set('refreshToken', refreshToken)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/manage/:path*', '/login'],
}
