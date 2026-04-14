import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default async function proxy(request: NextRequest) {
  // this isn't the secured way to handle authentication but fast way for redirecting users,
  // it only checks for the existance of the session cookie, doesn't validate it
  // handle authentication in per-page
  const session = getSessionCookie(request);
  const authenticated = !!session;
  const pathname = request.nextUrl.pathname;
  const url = request.url;

  // unauthenticated users accesing /dashboard
  if (!authenticated && ROUTES.DASHBOARD.test(pathname)) {
    return NextResponse.redirect(new URL("/auth", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

const ROUTES = {
  PUBLIC: /^\/($|pricing|features|blog)(?:\/|$)/,
  AUTH: /^\/auth(?:\/|$)/,
  DASHBOARD: /^\/dashboard(?:\/|$)/,
};
