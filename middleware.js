export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(request) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (request.nextUrl.pathname === "/cpanel" && session?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/properties/add",
    "/profile",
    "/profile/edit",
    "/profile/edit/(.*)",
    "/saved",
    "/cpanel",
  ],
};
