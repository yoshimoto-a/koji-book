import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { api } from "@/app/_utils/api";
import { useRouter } from "next/navigation";
import { RecipeArticle, Status } from "@prisma/client";
import { PutRequest } from "@/app/_types/Recipe/PutRequest";
interface Form {
  title: string;
  tips: string;
  material: string;
  status: Status;
  imageUrl: string | null;
}
export const useEditAritcleForm = ({ data }: { data: RecipeArticle }) => {
  const { push } = useRouter();
  const schema = z.object({
    title: z.string().min(1, { message: "必須です" }),
    tips: z.string().min(1, { message: "必須です" }),
    material: z.string().min(1, { message: "必須です" }),
    status: z.nativeEnum(Status, { required_error: "必須です" }),
    imageUrl: z.string().nullable(),
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
    },
  });

  const onSubmit = async (formData: Form) => {
    console.log(formData);
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
      reset();
      push(`/recipes/${data.id}`);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return {
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    watch,
    isSubmitting,
    reset,
    setValue,
  };
};
