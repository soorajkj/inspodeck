import type { Metadata } from "next";
import { createTheme } from "ssr-themes";
import { bindTheme } from "ssr-themes/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { fonts } from "@/lib/fonts";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Toaster from "@/components/Toaster";
import { AuthDialog } from "@/components/[site]/AuthDialog";
import "@/app/globals.css";

const { options } = createTheme({
  themes: ["light", "dark"],
  attribute: "class",
  defaultTheme: "system",
});

const { ThemeProvider } = bindTheme(options);

export const metadata: Metadata = {
  title: "Inspodeck",
  description: "The premium directory for design inspiration.",
  appleWebApp: {
    title: "Inspodeck",
  },
};

export default async function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body className="h-full min-h-dvh w-full bg-white font-sans text-base font-normal antialiased">
        <ThemeProvider forced="light">
          <NuqsAdapter>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NuqsAdapter>
          <Toaster />
          <AuthDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
