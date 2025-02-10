import { supabase } from "./supabase";

const getFilePathFromUrl = (urls: string[]) => {
  return urls.map(url => url.replace(/^.+\/recipe_image\//, ""));
};

export const deleteImage = async ({ imageUrls }: { imageUrls: string[] }) => {
  const filePath = getFilePathFromUrl(imageUrls);
  const { error } = await supabase.storage
    .from("recipe_image")
    .remove(filePath);
  if (error) throw new Error(error.message);
  return;
};
