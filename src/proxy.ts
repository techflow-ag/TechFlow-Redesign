import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_HEADER } from "./i18n/locale-header";
import { englishAliases } from "./i18n/routes";


/** Request headers with the locale added, for `rewrite` / `next`. */
function withLocale(request: NextRequest, lang: "fr" | "en") {
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, lang);
  return { request: { headers } };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const [, , first, ...rest] = pathname.split("/");
    const folder = first && englishAliases[first];
    if (!folder) return NextResponse.next(withLocale(request, "en"));
    url.pathname = ["", "en", folder, ...rest].join("/");
    return NextResponse.rewrite(url, withLocale(request, "en"));
  }

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    url.pathname = pathname.slice(3) || "/";
    // French has no prefix: /fr/... moved for good.
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, withLocale(request, "fr"));
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|.*\\..*).*)"],
};
