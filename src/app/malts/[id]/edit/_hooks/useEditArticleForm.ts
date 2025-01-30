import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { PostRequest } from "@/app/_types/Malts/PostRequest";
import { Status } from "@prisma/client";
import { api } from "@/app/_utils/api";
import { useRouter } from "next/navigation";
import { MaltArticle } from "@prisma/client";
import { PutRequest } from "@/app/_types/Malt/PutRequest";
interface Form {
  title: string;
  time: number;
  tips: string;
  material: string;
  status: Status;
  temperature: number;
}
export const useEditAritcleForm = ({ data }: { data: MaltArticle }) => {
  const { push } = useRouter();
  const schema = z.object({
    title: z.string().min(1, { message: "必須です" }),
    time: z.string().min(1, { message: "必須です" }),
    tips: z.string().min(1, { message: "必須です" }),
    material: z.string().min(1, { message: "必須です" }),
    temperature: z.string().min(1, { message: "必須です" }),
    status: z.nativeEnum(Status, { required_error: "必須です" }),
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
      material: data.material,
      status: data.status,
      temperature: data.temperature,
      time: data.time,
      tips: data.tips,
      title: data.title,
    },
  });

  const onSubmit = async (formData: Form) => {
    console.log(formData);
    try {
      const { material, temperature, time, tips, title, status } = formData;
      const body: PostRequest = {
        maltRole: data.maltRole,
        title,
        time: Number(time),
        tips,
        material,
        status,
        temperature: Number(temperature),
      };
      await api.put<PutRequest, { message: string }>(
        `/api/malts/${data.id}`,
        body
      );
      reset();
      push(`/malts/${data.id}`);
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
    reset,
  };
};
