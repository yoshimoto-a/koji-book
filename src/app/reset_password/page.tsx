"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../_components/Button";
import { Input } from "../_components/Input";
import { supabase } from "../_utils/supabase";
import { useRouter } from "next/navigation";
type Form = {
  password: string;
};
export default function ResetPassword() {
  const { push } = useRouter();
  const schema = z.object({
    password: z.string().min(1, { message: "必須です" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = async (formData: Form) => {
    try {
      const { password } = formData;
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        throw new Error(error.message);
      }
      toast.success("パスワードを設定しました。");
      push("/login");
    } catch (e) {
      console.error(e);
      toast.error("パスワードの設定に失敗しました");
    }
  };
  return (
    <div className="flex flex-col items-center gap-3 p-5">
      <Toaster />
      <h1 className="text-2xl pb-20">パスワード再設定</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="パスワード"
          id="password"
          type="password"
          errors={errors.password}
          {...register("password")}
        />
        <Button type="submit" disabled={isSubmitting}>
          登録する
        </Button>
      </form>
    </div>
  );
}
