import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes('/dashboard')) {
    const token = request.cookies.get('token')?.value
    const username = request.cookies.get('username')?.value

    if (!token || !username) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}
