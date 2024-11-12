import getSession from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { vi, describe, it, Mock, expect, beforeEach } from "vitest";
import { middleware } from "../middleware";

vi.mock("@/lib/session", () => ({
  default: vi.fn(),
}));

describe("Middleware test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should redirect to /access-denied if user role is not allowed for user routes", async () => {
    (getSession as Mock).mockResolvedValue({ isLoggedIn: true, role: "admin" });
    const req = new NextRequest("http://localhost:3000/create-appointment");
    const res = await middleware(req);
    expect(res).toEqual(
      NextResponse.redirect(new URL("/access-denied", req.url))
    );
  });

  it("should redirect to /access-denied if user role is not allowed for admin routes", async () => {
    (getSession as Mock).mockResolvedValue({ isLoggedIn: true, role: "user" });
    const req = new NextRequest("http://localhost:3000/history");
    const res = await middleware(req);
    expect(res).toEqual(
      NextResponse.redirect(new URL("/access-denied", req.url))
    );
  });

  it("should not allow logged users to enter /login page", async () => {
    (getSession as Mock).mockResolvedValue({ isLoggedIn: true });
    const req = new NextRequest("http://localhost:3000/login");
    const res = await middleware(req);
    expect(res).toEqual(NextResponse.redirect(new URL("/", req.url)));
  });

  it("should not allow logged users to enter /register page", async () => {
    (getSession as Mock).mockResolvedValue({ isLoggedIn: true });
    const req = new NextRequest("http://localhost:3000/register");
    const res = await middleware(req);
    expect(res).toEqual(NextResponse.redirect(new URL("/", req.url)));
  });

  it("should redirect to /login the users who are not logged in", async () => {
    (getSession as Mock).mockResolvedValue({ isLoggedIn: false });
    const req = new NextRequest("http://localhost:3000/login");
    const res = await middleware(req);
    expect(res).toEqual(NextResponse.next());
  });

  it("should redirect to /register the users who are unregistered", async () => {
    (getSession as Mock).mockResolvedValue({ isLoggedIn: false });
    const req = new NextRequest("http://localhost:3000/register");
    const res = await middleware(req);
    expect(res).toEqual(NextResponse.next());
  });
});
