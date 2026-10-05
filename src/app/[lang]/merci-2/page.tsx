import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MerciPage } from "@/components/landing/merci-page";
import { merci } from "@/components/landing/merci-content";
import { Providers } from "@/components/site/providers";

// /merci-2: the /merci landing page in the site's design system, to compare with /merci (served as is).
// French only, never indexed, outside the sitemap and llms.txt (same reasons as /merci).
export const metadata: Metadata = {
  title: { absolute: merci.meta.title },
  description: merci.meta.description,
  robots: { index: false, follow: false },
};

export default async function Merci2({ params }: PageProps<"/[lang]/merci-2">) {
  const { lang } = await params;
  if (lang !== "fr") notFound();
  return (
    <Providers lang="fr">
      <MerciPage />
    </Providers>
  );
}
