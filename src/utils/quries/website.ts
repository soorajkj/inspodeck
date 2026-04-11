import { hrpc } from "@/utils/hrpc";
import {
  CreateWebsiteWithoutImageSchema,
  UpdateWebsiteImageSchema,
} from "@/utils/schemas/website";

export const getWebsites = async () => {
  const res = await hrpc.api.websites.$get();
  if (!res.ok) throw new Error("Failed to fecth websites");
  return await res.json();
};

export const createWebsite = async (json: CreateWebsiteWithoutImageSchema) => {
  const res = await hrpc.api.websites.$post({ json });
  if (!res.ok) throw new Error("Failed to create website");
  return await res.json();
};

export const updateWebsiteThumbnail = async (
  id: string,
  data: UpdateWebsiteImageSchema
) => {
  const res = await hrpc.api.websites[":id"].image.$patch({
    param: { id },
    form: data,
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return await res.json();
};
