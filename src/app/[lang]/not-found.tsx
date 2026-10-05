import type { Metadata } from "next";
import { headers } from "next/headers";
import { NotFoundContent } from "@/components/page/not-found";
import { PageShell } from "@/components/page/shell";
import { LOCALE_HEADER } from "@/i18n/locale-header";

export const metadata: Metadata = { robots: { index: false, follow: true } };

// Server component: PageShell renders SiteFooter, an async server component (it fetches the tool
// links from Sanity), which a client component can't render. When this file was a client component,
// every 404 crashed into Next's bare fallback ("This page could not be found"). Not-found pages get
// no params, so the language comes from the header set by the proxy.
export default async function NotFound() {
  const lang = (await headers()).get(LOCALE_HEADER) === "en" ? "en" : "fr";
  return (
    <PageShell lang={lang}>
      <NotFoundContent />
    </PageShell>
  );
}
