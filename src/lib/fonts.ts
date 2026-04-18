import { Syne, Geist_Mono } from "next/font/google";

const sans = Syne({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  adjustFontFallback: false,
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
