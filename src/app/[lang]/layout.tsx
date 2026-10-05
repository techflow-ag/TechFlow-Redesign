import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { siteUrl } from "@/i18n/routes";
import { getSiteSettings } from "@/sanity/seo";
import "../globals.css";
import { fontClasses } from "../fonts";

// Fonts live in ../fonts.ts, shared with app/global-not-found.tsx (which renders outside this layout).

// No `dynamicParams = false` here: Next applies it to every child route, which would 404
// CMS slugs published after the build. Unknown locales are rejected in the layout below.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const { meta } = lang === "en" ? en : fr;
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    applicationName: settings?.siteName || "TechFlow",
    // Search Console "HTML tag" verification, from Site settings in the Studio.
    verification: settings?.googleVerification ? { google: settings.googleVerification } : undefined,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${fontClasses} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
