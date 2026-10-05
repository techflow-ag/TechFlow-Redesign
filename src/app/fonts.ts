import { Geist_Mono, Instrument_Serif } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  // Only small labels use it: not worth competing with the hero text and images on first load.
  preload: false,
});

/** Font CSS variables for <html>, in the root layout and the global 404. */
export const fontClasses = `${satoshi.variable} ${instrumentSerif.variable} ${geistMono.variable}`;
