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
    time: z.number().int().min(0, { message: "0以上の数値を入力してください" }),
    tips: z.string().min(1, { message: "必須です" }),
    material: z.string().min(1, { message: "必須です" }),
    temperature: z
      .number()
      .int()
      .min(0, { message: "0以上の数値を入力してください" }),
    status: z.nativeEnum(Status, { required_error: "必須です" }),
    imageUrl: z.string().nullable().optional(),
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
      imageUrl: null,
    },
  });

  const onSubmit = async (formData: Form) => {
    try {
      const { material, temperature, time, tips, title, status, imageUrl } =
        formData;
      const body: PostRequest = {
        maltRole: "MAIN",
        title,
        time,
        tips,
        material,
        status,
        temperature,
        imageUrl,
      };
      await api.post<PostRequest, { message: string }>("/api/malts", body);
      await deleteImage({ imageUrls: deleteImageUrls });
      reset();
      push("/malts");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  const cancel = async () => {
    const imageUrl = watch("imageUrl");
    if (imageUrl) {
      deleteImageUrls.push(imageUrl);
    }
    reset();
    await deleteImage({
      imageUrls: deleteImageUrls,
    });
    push(`/malts`);
    return;
  };
  type Option = { value: Status; label: string };
  const options: Option[] = [
    { value: Status.DRAFT, label: "下書き保存" },
    { value: Status.PENDING_APPROVAL, label: "投稿申請" },
  ];

  return {
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    watch,
    setValue,
    setDeleteImageUrls,
    cancel,
    options,
  };
};
