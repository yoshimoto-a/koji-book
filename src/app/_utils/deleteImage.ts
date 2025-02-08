import { supabase } from "./supabase";

const getFilePathFromUrl = (url: string) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 1]; // 最後の部分がファイル名
};

export const deleteImage = async ({ imageUrl }: { imageUrl: string }) => {
  const filePath = getFilePathFromUrl(imageUrl);
  return await supabase.storage.from("recipe_image").remove([filePath]);
};
