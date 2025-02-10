import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { PostRequest } from "@/app/_types/Malts/PostRequest";
import { Status } from "@prisma/client";
import { api } from "@/app/_utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteImage } from "@/app/_utils/deleteImage";

interface Form {
  title: string;
  time: number;
  tips: string;
  material: string;
  status: Status;
  temperature: number;
  imageUrl: string | null;
}
export const useAddAritcleForm = () => {
  const { push } = useRouter();
  const [deleteImageUrls, setDeleteImageUrls] = useState<string[]>([]);

  const schema = z.object({
    title: z.string().min(1, { message: "必須です" }),
    time: z.number().min(1, { message: "必須です" }),
    tips: z.string().min(1, { message: "必須です" }),
    material: z.string().min(1, { message: "必須です" }),
    temperature: z.number().min(1, { message: "必須です" }),
    status: z.nativeEnum(Status, { required_error: "必須です" }),
    imageUrl: z.string().nullable(),
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      material: "",
      status: "DRAFT",
      temperature: 60,
      time: 8,
      tips: "",
      title: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (formData: Form) => {
    try {
      const { material, temperature, time, tips, title, status, imageUrl } =
        formData;
      const body: PostRequest = {
        maltRole: "MAIN",
        title,
        time: Number(time),
        tips,
        material,
        status,
        temperature: Number(temperature),
        imageUrl,
      };
      await api.post<PostRequest, { message: string }>("/api/malts", body);
      if (1 <= deleteImageUrls.length) {
        await deleteImage({ imageUrls: deleteImageUrls });
      }
      reset();
      push("/malts");
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
    isSubmitting,
    watch,
    setValue,
    setDeleteImageUrls,
  };
};
