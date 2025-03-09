import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "./services/get-token";

export async function middleware(request: NextRequest) {
  const { user, isLogged } = await getAuth();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/parent/")) {
    if (user.role !== "Parent" || !isLogged) {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/tutor/")) {
    if (user.role !== "Tutor" || !isLogged) {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/checkout")) {
    if (!isLogged) {
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
