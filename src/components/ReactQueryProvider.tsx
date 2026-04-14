"use client";

import {
  QueryClientProvider,
  type QueryClientProviderProps,
} from "@tanstack/react-query";
import { getQueryClient } from "@/utils/queryClient";
import ErrorBoundry from "./ErrorBoundary";

type ReactQueryProviderProps = Omit<QueryClientProviderProps, "client">;

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundry>{children}</ErrorBoundry>
    </QueryClientProvider>
  );
}
