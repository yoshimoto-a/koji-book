"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/app/_utils/supabase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";

interface LoginForm {
  email: string;
  password: string;
}

export const useLoginFrom = () => {
  const [, setPassword] = useLocalStorage<string>("koji-password", "");
  const [, setEmail] = useLocalStorage<string>("koji-email", "");

  const { push } = useRouter();
  const schema = z.object({
    email: z
      .string()
      .min(1, { message: "メールアドレスは必須です" })
      .email({ message: "無効なメールアドレスです" }),
    password: z.string().min(1, { message: "パスワードは必須(6文字以上)です" }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (formdata: LoginForm) => {
    try {
      const { email, password } = formdata;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      setPassword(password);
      setEmail(email);
      reset();
      push("/");
      toast.success("ログインしました");
    } catch (e) {
      console.error(e);
      alert(e);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
