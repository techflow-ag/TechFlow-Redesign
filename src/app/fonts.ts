import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

// Satoshi files are subset to Latin, Latin-1/Extended-A, punctuation, arrows and € (French + English);
// ~20 KB each instead of 25 KB. Re-subset with fonttools' pyftsubset if a new character is needed.
const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "../fonts/Satoshi-400.woff2", weight: "400" },
    { path: "../fonts/Satoshi-500.woff2", weight: "500" },
    { path: "../fonts/Satoshi-700.woff2", weight: "700" },
  ],
});

// Staging trial (2026-10-03): Tobias (trial licence) replaces Instrument Serif for the display type.
// Variable fonts (wght 100–900) subset like Satoshi, ~32 KB each. Not on main.
const tobias = localFont({
  variable: "--font-tobias",
  src: [
    { path: "../fonts/tobias-uprights.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/tobias-italics.woff2", weight: "100 900", style: "italic" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  // Only small labels use it: not worth competing with the hero text and images on first load.
  preload: false,
});

/** Font CSS variables for <html>, in the root layout and the global 404. */
export const fontClasses = `${satoshi.variable} ${tobias.variable} ${geistMono.variable}`;
