import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path.startsWith("/post")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session) {
    if (path === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
