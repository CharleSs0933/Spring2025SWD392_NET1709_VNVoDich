import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./services/get-user-me-loader";
import { useUser } from "./hooks/useUser";
import { getAuth } from "./services/get-token";

const protectedRoutes = ["/dashboard"];

function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const { user } = await getAuth();
  const currentPath = request.nextUrl.pathname;

  if (isProtectedRoute(currentPath) && user?.role === "Tutor") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
