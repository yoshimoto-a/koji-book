import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/app/_utils/supabase";
import { PostRequest } from "@/app/_types/Register/PostRequest";
interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export const useSignup = () => {
  const schema = z.object({
    name: z.string().min(1, { message: "必須です" }),
    email: z
      .string()
      .min(1, { message: "必須です" })
      .email({ message: "無効なメールアドレスです" }),
    password: z.string().min(1, { message: "パスワードは必須(6文字以上)です" }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (formData: SignupForm) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/login`,
        },
      });
      if (error) {
        throw new Error(`登録に失敗しました:${error}`);
      }
      if (!data.user?.id) {
        throw new Error(`supabaseUserIdがありません`);
      }
      const body: PostRequest = {
        name: formData.name,
        supabaseUserId: data.user.id,
      };
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "登録に失敗しました。";
        throw new Error(errorMessage);
      }
      alert(
        "ご登録ありがとうございます。メールを送信しましたので確認をお願いします。"
      );
      reset();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
