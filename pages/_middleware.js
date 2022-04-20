import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.token;
  // console.log(token);

  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
