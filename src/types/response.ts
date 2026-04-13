import type { InferResponseType } from "hono";
import { hrpc } from "@/utils/hrpc";

export type TWebsite = InferResponseType<typeof hrpc.api.websites.$get>[number];
