import { hrpc } from "../hrpc";
import {
  CreateWebsiteSchema,
  UpdateWebsiteAssetsSchema,
} from "../schemas/website";

export const getWebsites = async () => {
  const res = await hrpc.api.admin.websites.$get();
  if (!res.ok) throw new Error("Failed to fetch admin websites");
  return await res.json();
};

export const createWebsite = async (data: CreateWebsiteSchema) => {
  const res = await hrpc.api.admin.websites.$post({ json: data });
  if (!res.ok) throw new Error("Failed to create admin website");
  return await res.json();
};

export const getWebsite = async (id: string) => {
  const res = await hrpc.api.admin.websites[":id"].$get({
    param: { id },
  });
  if (!res.ok) throw new Error("Failed to fetch admin websites");
  return await res.json();
};

export const updateWebsiteAssets = async (
  id: string,
  data: UpdateWebsiteAssetsSchema
) => {
  const res = await hrpc.api.admin.websites[":id"].assests.$patch({
    param: { id },
    form: data,
  });
  if (!res.ok) throw new Error("Failed to update admin website assets");
  return await res.json();
};

export const deleteWebsite = async (id: string) => {
  const res = await hrpc.api.admin.websites[":id"].$delete({
    param: { id },
  });
  if (!res.ok) throw new Error("Failed to delete admin website");
  return await res.json();
};

export const getCategories = async () => {
  const res = await hrpc.api.admin.categories.$get();
  if (!res.ok) throw new Error("Failed to fetch admin catgories");
  return await res.json();
};
