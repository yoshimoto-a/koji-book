"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { api } from "@/app/_utils/api";
import { useRouter } from "next/navigation";
import { RecipeArticle, Status } from "@prisma/client";
import { PutRequest } from "@/app/_types/Recipe/PutRequest";
import { useCategories } from "@/app/recipes/_hooks/useCategories";
import { useEffect, useState } from "react";
import { deleteImage } from "@/app/_utils/deleteImage";
interface Form {
  title: string;
  tips: string;
  material: string;
  status: Status;
  imageUrl: string | null;
  maltArticleId: string;
}
export const useEditAritcleForm = ({ data }: { data: RecipeArticle }) => {
  const { push } = useRouter();
  const { data: categoriesData, error } = useCategories();
  const [categories, setCategories] = useState<
    null | { value: string; label: string }[]
  >(null);
  const [deleteImageUrls, setDeleteImageUrls] = useState<string[]>([]);

  const schema = z.object({
    title: z.string().min(1, { message: "必須です" }),
    tips: z.string().min(1, { message: "必須です" }),
    material: z.string().min(1, { message: "必須です" }),
    status: z.nativeEnum(Status, { required_error: "必須です" }),
    imageUrl: z.string().nullable(),
    maltArticleId: z.string(),
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      material: data.material,
      tips: data.tips,
      title: data.title,
      status: data.status,
      imageUrl: data.imageUrl,
      maltArticleId: data.maltArticleId,
    },
  });

  const onSubmit = async (formData: Form) => {
    try {
      const { material, tips, title, status, imageUrl } = formData;
      const body: PutRequest = {
        title,
        tips,
        material,
        imageUrl,
        status,
      };
      await api.put<PutRequest, { message: string }>(
        `/api/recipes/${data.id}`,
        body
      );
      if (1 <= deleteImageUrls.length) {
        await deleteImage({ imageUrls: deleteImageUrls });
      }
      reset();
      push(`/recipes/${data.id}`);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  useEffect(() => {
    if (!categoriesData) return;
    setCategories(
      categoriesData.maltArticles.map(malt => ({
        value: malt.id,
        label: malt.title,
      }))
    );
  }, [categoriesData]);

  const cancel = async () => {
    const imageUrl = watch("imageUrl");
    if (imageUrl) {
      deleteImageUrls.push(imageUrl);
    }
    reset();
    if (1 <= deleteImageUrls.length) {
      await deleteImage({
        imageUrls: deleteImageUrls.filter(url => url !== data.imageUrl),
      });
    }
    push(`/recipes/${data.id}`);
    return;
  };

  return {
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    watch,
    isSubmitting,
    setValue,
    categories,
    error,
    setDeleteImageUrls,
    cancel,
  };
};
