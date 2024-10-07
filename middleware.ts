import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions";

export async function middleware(req: NextRequest) {
  const session = await getSession();

  const isLoggedIn = session?.isLoggedIn;
  const role = session?.role;

  const protectedRoutes = ["/login", "/register"];
  const adminRoutes = ["/create-appointment"];

  if (
    isLoggedIn &&
    adminRoutes.includes(req.nextUrl.pathname) &&
    role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/access-denied", req.url));
  }

  if (isLoggedIn && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/create-appointment"],
};
