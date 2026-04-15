import { hrpc } from "@/utils/hrpc";

export const getWebsites = async () => {
  const res = await hrpc.api.websites.$get();
  if (!res.ok) throw new Error("Failed to fecth websites");
  return await res.json();
};

export const toggleLike = async (id: string) => {
  const res = await hrpc.api.websites[":id"].like.$post({
    param: { id },
  });
  if (!res.ok) throw new Error("Failed to toggle like");
  return await res.json();
};

export const getLikedWebsites = async () => {
  const res = await hrpc.api.me.likes.$get();
  if (!res.ok) throw new Error("Failed to fetch liked websites");
  return await res.json();
};
