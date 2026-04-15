import { hrpc } from "@/utils/hrpc";
import {
  CreateWebsiteWithoutImageSchema,
  UpdateWebsiteImageSchema,
  UpdateWebsiteWithoutImageSchema,
} from "@/utils/schemas/website";

export const getAdminWebsites = async () => {
  const res = await hrpc.api.admin.websites.$get();
  if (!res.ok) throw new Error("Failed to fetch admin websites");
  return await res.json();
};

export const createAdminWebsite = async (
  data: CreateWebsiteWithoutImageSchema
) => {
  const res = await hrpc.api.admin.websites.$post({ json: data });
  if (!res.ok) throw new Error("Failed to create admin website");
  return await res.json();
};

export const updateAdminWebsiteWithoutImage = async (
  id: string,
  data: UpdateWebsiteWithoutImageSchema
) => {
  const res = await hrpc.api.admin.websites[":id"].$patch({
    param: { id },
    json: data,
  });
  if (!res.ok) throw new Error("Failed to update admin website");
  return await res.json();
};

export const updateAdminWebsiteImage = async (
  id: string,
  data: UpdateWebsiteImageSchema
) => {
  const res = await hrpc.api.admin.websites[":id"].image.$patch({
    param: { id },
    form: data,
  });
  if (!res.ok) throw new Error("Failed to update admin website image");
  return await res.json();
};

export const deleteAdminWebsite = async (id: string) => {
  const res = await hrpc.api.admin.websites[":id"].$delete({
    param: { id },
  });
  if (!res.ok) throw new Error("Failed to delete admin website");
  return await res.json();
};
