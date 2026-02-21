import { NextRequest, NextResponse } from "next/server";

// middleware runs on the server; we can't read localStorage here.
// use the presence of the refresh token cookie (httpOnly) as a proxy
// to determine if the user might still be authenticated.
export function middleware(req: NextRequest) {
  const refresh = req.cookies.get("refreshToken");
  if (req.nextUrl.pathname.startsWith("/dashboard") && !refresh) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
