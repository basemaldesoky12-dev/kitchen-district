import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/lib/i18n";

const DEFAULT_LOCALE = "ar";

/** Redirect locale-less URLs to the default locale: "/pricing" -> "/ar/pricing". */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  // 308 so search engines treat the locale-less URL as permanently moved.
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  // Skip Next internals, metadata files (favicon, icons), and anything with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
