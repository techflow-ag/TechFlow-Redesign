import { merciHtml } from "@/landing/merci-html";

/**
 * /merci: landing page shown after the Meta lead form (end-screen button), with Arthur's Calendly.
 * Served "as is" from the former Astro site (see scripts/landing/import-merci.py): a full HTML
 * document with its own styles under /lp/merci/, without the site's header, footer or consent banner.
 * French only, never indexed (noindex meta + header) and absent from the sitemap and llms.txt.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "fr") return new Response("Not found", { status: 404 });
  return new Response(merciHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
