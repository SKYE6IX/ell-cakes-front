import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/isAuthenticated";

export async function proxy(request: NextRequest) {
  const isSignIn = await isAuthenticated();
  if (!isSignIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/order-history",
    "/verify-user",
    "/order/order-status",
  ],
};
