import { hc } from "hono/client";
import { ApiType } from "@/api";

export const hrpc = hc<ApiType>(process.env.NEXT_PUBLIC_BASE_URL as string, {
  init: {
    credentials: "include",
  },
  headers: async () => {
    if (typeof window !== "undefined") return {};
    const { headers } = await import("next/headers");
    const h = await headers();
    const record: Record<string, string> = {};
    h.forEach((value, key) => {
      record[key] = value;
    });
    return record;
  },
});
