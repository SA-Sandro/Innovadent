import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions"; 

export async function middleware(req: NextRequest) {
  const session = await getSession();

  const isLoggedIn = session?.isLoggedIn;

  const protectedRoutes = ["/login", "/register"];

  if (isLoggedIn && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
