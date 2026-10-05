import type { Metadata } from "next";
import { headers } from "next/headers";
import { NotFoundContent } from "@/components/page/not-found";
import { PageShell } from "@/components/page/shell";
import { LOCALE_HEADER } from "@/i18n/locale-header";
import { fontClasses } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | TechFlow",
  robots: { index: false, follow: true },
};

// 404 for URLs that match no route (e.g. /[service] with dynamicParams = false). The root layout lives
// under [lang], so [lang]/not-found.tsx can't catch them: Next renders this file instead, outside
// every layout (`experimental.globalNotFound` in next.config.ts), hence its own <html>, styles and fonts.
// Same page as [lang]/not-found.tsx; the language comes from the header set by the proxy.
export default async function GlobalNotFound() {
  const lang = (await headers()).get(LOCALE_HEADER) === "en" ? "en" : "fr";
  return (
    <html lang={lang} className={`${fontClasses} h-full antialiased`}>
      <body className="min-h-full">
        <PageShell lang={lang}>
          <NotFoundContent />
        </PageShell>
      </body>
    </html>
  );
}
