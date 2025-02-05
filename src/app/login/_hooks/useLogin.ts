"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/app/_utils/supabase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import { useEffect, useCallback } from "react";
interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [password, setPassword] = useLocalStorage<string>("koji-password", "");
  const [email, setEmail] = useLocalStorage<string>("koji-email", "");

  const router = useRouter();
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

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      throw new Error(`ログインに失敗しました:${error}`);
    }
  }, []);

  const onSubmit = async (formdata: LoginForm) => {
    const toastId = toast.loading("ログイン処理中...");
    try {
      const { email, password } = formdata;
      await login(email, password);
      setPassword(password);
      setEmail(email);
      reset();
      router.replace("/malts");
    } catch (e) {
      console.error(e);
      alert(e);
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    const signIn = async () => {
      try {
        await login(email, password);
        router.replace("/malts");
      } catch (e) {
        console.error(e);
        alert(e);
      }
    };
    if (!password) return;
    if (!email) return;
    signIn();
  }, [email, password, router, login]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    password,
  };
};
