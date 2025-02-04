import { v4 as uuidv4 } from "uuid";
import { supabase } from "./supabase";
import { supabaseImageUrl } from "./supabaseImageUrl";
import imageCompression from "browser-image-compression";

export const uploadImage = async ({ file }: { file: File }) => {
  const options = {
    maxSizeMB: 1,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    const filePath = `private/${uuidv4()}`; // ファイル名を指定
    const { data, error } = await supabase.storage
      .from("recipe_image")
      .upload(filePath, compressedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return {
      imageUrl: supabaseImageUrl(data.path),
    };
  } catch (error) {
    alert(error);
    return {
      imageUrl: "",
    };
  }
};
