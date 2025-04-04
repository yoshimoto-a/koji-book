"use client";

import React from "react";
import { Form } from "../_components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/app/_components/Button";
import { supabase } from "../_utils/supabase";
import { Input } from "../_components/Input";
import { useRouter } from "next/navigation";
type Form = {
  email: string;
};
export default function ForgotPassword() {
  const { push } = useRouter();
  const schema = z.object({
    email: z.string().min(1, { message: "必須です" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (formData: Form) => {
    try {
      const { email } = formData;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/reset_password`,
      });
      if (error) {
        throw new Error(error.message);
      }
      toast.success("再設定メールを送信しました");
      push("/");
    } catch (e) {
      console.error(e);
      toast.error("再設定メールを送信できませんでした");
    }
  };
  return (
    <div>
      <Toaster />
      <Form onSubmit={handleSubmit(onSubmit)} title="パスワードの設定">
        <p className="text-center mb-6">
          パスワードの設定用URLを下記アドレス宛に送信します
        </p>
        <div className="mb-4">
          <Input
            label="登録のメールアドレス"
            id="email"
            type="text"
            inputMode="text"
            {...register("email")}
            errors={errors.email}
          />
        </div>
        <div className="flex justify-center">
          <Button disabled={isSubmitting} type="submit">
            再設定メール送信
          </Button>
        </div>
      </Form>
    </div>
  );
}
