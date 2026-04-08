"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { ThemeProviderProps, ThemeProvider as NTProvider } from "next-themes";
import { forcedTheme } from "@/utils/theme";

export default function ThemeProvider({ ...props }: ThemeProviderProps) {
  const path = usePathname();
  const theme = useMemo(() => forcedTheme(path), [path]);

  return <NTProvider forcedTheme={theme} {...props} />;
}
