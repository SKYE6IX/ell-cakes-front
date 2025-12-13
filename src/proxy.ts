import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isSignIn = request.cookies.has("keystonejs-session");
  if (!isSignIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/order-history", "/confirm-phone"],
};
