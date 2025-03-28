import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "./services/get-token";

export async function middleware(request: NextRequest) {
  const { user, isLogged, isSub, authToken } = await getAuth();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/parent/")) {
    if (!isLogged || user?.role !== "Parent") {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/tutor/")) {
    if (!isLogged || user?.role !== "Tutor") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (!isSub) {
      return NextResponse.redirect(new URL("/package", request.url));
    }
  }

  if (pathname.startsWith("/checkout")) {
    if (!isLogged) {
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    }
    if (user?.role !== "Parent") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
