import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isSignIn = request.cookies.has("keystonejs-session");

  if (isSignIn) {
    return NextResponse.next();
  }

  const redirectUrl = new URL("/login", request.url);
  const redirectResponse = NextResponse.redirect(redirectUrl);

  redirectResponse.headers.set("x-middleware-cache", "no-cache");

  return redirectResponse;
}

export const config = {
  matcher: ["/dashboard", "/order-history", "/confirm-phone"],
};
