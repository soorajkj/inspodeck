import { Geist_Mono, Syne } from "next/font/google";

// -FontOnest-
// -FontMonaSans-
const sans = Syne({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  adjustFontFallback: true,
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  adjustFontFallback: true,
});

const join = (items: string[]) => items.join(" ");

export const fonts = join([sans.variable, mono.variable]);
