import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/isAuthenticated";

export async function proxy(request: NextRequest) {
  const isSignIn = await isAuthenticated();
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/order-history",
    "/verify-user",
    "/order/order-status",
  ];
  const authRoutes = ["/login", "/registration"];

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isSignIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isSignIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/order-history",
    "/verify-user",
    "/order/order-status",
    "/login",
    "/registration",
  ],
};
