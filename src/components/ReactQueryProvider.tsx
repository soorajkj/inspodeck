"use client";

import {
  QueryClientProvider,
  type QueryClientProviderProps,
} from "@tanstack/react-query";
import { getQueryClient } from "@/utils/queryClient";

type ReactQueryProviderProps = Omit<QueryClientProviderProps, "client">;

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
