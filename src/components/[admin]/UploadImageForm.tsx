"use client";

import { useState } from "react";
import Image from "next/image";
import { Image01Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@base-ui/react/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { useWebsitesUpdateThumbnailMutation } from "@/hooks/useWebsitesMutations";

interface UploadImageFormProps {
  websiteId: string;
  onSuccess: () => void;
  onSkip: () => void;
}

export default function UploadImageForm({
  websiteId,
  onSuccess,
  onSkip,
}: UploadImageFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutateAsync, isPending: isUploading } =
    useWebsitesUpdateThumbnailMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!websiteId || !selectedFile) return;

    try {
      await mutateAsync({ id: websiteId, data: { image: selectedFile } });
      onSuccess();
    } catch (error) {
      console.error("Failed to upload thumbnail", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 transition-all hover:border-rose-300 hover:bg-rose-50/30">
        {previewUrl ? (
          <div className="relative h-full w-full p-2">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="rounded-xl object-cover shadow-sm"
            />
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-md backdrop-blur transition-all hover:scale-110 hover:bg-white"
            >
              <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
            htmlFor="image-upload"
          >
            <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm transition-transform group-hover:scale-110">
              <HugeiconsIcon
                icon={Image01Icon}
                className="h-8 w-8 text-gray-400 group-hover:text-rose-500"
              />
            </div>
            <p className="text-sm font-semibold text-gray-900">
              Click to upload website screenshot
            </p>
            <p className="mt-1 text-xs text-gray-500">
              High-quality PNG or JPG up to 5MB
            </p>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button
          onClick={onSkip}
          className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 text-sm leading-none font-semibold whitespace-nowrap text-neutral-950 inset-shadow-2xs inset-shadow-neutral-100 transition-all hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-20"
        >
          Skip for now
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-rose-600 px-6 text-sm leading-none font-semibold whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-rose-400 transition-all hover:bg-rose-500 disabled:pointer-events-none disabled:opacity-20"
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
