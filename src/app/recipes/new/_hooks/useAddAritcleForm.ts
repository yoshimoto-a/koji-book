import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { api } from "@/app/_utils/api";
import { useRouter } from "next/navigation";
import { Status } from "@prisma/client";
import { PostRequest } from "@/app/_types/Recipes/PostRequest";
import { useCategories } from "../../_hooks/useCategories";
import { useEffect, useState } from "react";
interface Form {
  title: string;
  tips: string;
  material: string;
  status: Status;
  maltArticleId: string;
}
export const useAddAritcleForm = () => {
  const { push } = useRouter();
  const { data } = useCategories();
  const [categories, setCategories] = useState<
    null | { value: string; label: string }[]
  >(null);
  const schema = z.object({
    title: z.string().min(1, { message: "必須です" }),
    tips: z.string().min(1, { message: "必須です" }),
    material: z.string().min(1, { message: "必須です" }),
    status: z.nativeEnum(Status, { required_error: "必須です" }),
    maltArticleId: z.string(),
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      material: "",
      tips: "",
      title: "",
      status: "DRAFT",
      maltArticleId: data?.maltArticles[0].id,
    },
  });

  const onSubmit = async (formData: Form) => {
    try {
      const { material, tips, title, status, maltArticleId } = formData;
      const body: PostRequest = {
        title,
        tips,
        material,
        status,
        maltArticleId,
      };
      await api.post<PostRequest, { message: string }>(`/api/recipes`, body);
      reset();
      push(`/recipes`);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  useEffect(() => {
    if (!data) return;
    setCategories(
      data.maltArticles.map(malt => ({ value: malt.id, label: malt.title }))
    );
  }, [data]);

  return {
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    reset,
    categories,
  };
};
