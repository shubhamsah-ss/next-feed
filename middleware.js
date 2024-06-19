import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  console.log('Middleware');
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (!token) {
    if (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/verify") || url.pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  } else {
    // If the user is authenticated and tries to access auth-related paths, redirect to dashboard
    if (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*', '/verify/:path*', "/profile"],
}
