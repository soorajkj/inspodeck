import { hrpc } from "../hrpc";
import { GetWebsitesQuerySchema } from "../schemas/website";

export const getWebsites = async ({
  cursor,
  limit,
}: GetWebsitesQuerySchema) => {
  const res = await hrpc.api.websites.$get({
    query: {
      ...(limit && { limit: limit.toString() }),
      ...(cursor && { cursor }),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch websites");
  return await res.json();
};
