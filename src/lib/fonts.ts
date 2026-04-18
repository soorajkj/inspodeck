import { Syne, Geist_Mono, DM_Serif_Text } from "next/font/google";

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

const display = DM_Serif_Text({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  adjustFontFallback: true,
});

const join = (items: string[]) => items.join(" ");

export const fonts = join([sans.variable, mono.variable, display.variable]);
