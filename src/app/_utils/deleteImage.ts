import { supabase } from "./supabase";
/**エラーをスローするためtry-catchの中で使う */
const getFilePathFromUrl = (urls: string[]) => {
  return urls.map(url => url.replace(/^.+\/recipe_image\//, ""));
};

export const deleteImage = async ({ imageUrls }: { imageUrls: string[] }) => {
  if (imageUrls.length === 0) return;
  const filePath = getFilePathFromUrl(imageUrls);
  const { error } = await supabase.storage
    .from("recipe_image")
    .remove(filePath);
  if (error) throw new Error(error.message);
  return;
};
