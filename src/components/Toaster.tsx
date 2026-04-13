"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";
import { useTheme } from "next-themes";

export default function Toaster() {
  const { theme } = useTheme();
  return <Sonner theme={theme as ToasterProps["theme"]} />;
}
