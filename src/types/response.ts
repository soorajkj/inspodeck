import type { InferResponseType } from "hono";
import { hrpc } from "@/utils/hrpc";

export type Website = InferResponseType<typeof hrpc.api.websites.$get>[number];

export type AdminWebsite = InferResponseType<
  typeof hrpc.api.admin.websites.$get
>[number];

export type LikedWebsite = InferResponseType<
  typeof hrpc.api.me.likes.$get
>[number];
