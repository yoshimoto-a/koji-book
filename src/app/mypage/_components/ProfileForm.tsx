"use client";
import { useUser } from "@/app/_hooks/useUser";
import { Input } from "@/app/_components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { PutRequest } from "@/app/_types/Mypage/PutRequest";
import { api } from "@/app/_utils/api";
import { Button } from "@/app/_components/Button";
import { supabase } from "@/app/_utils/supabase";
interface ProfileForm {
  email: string;
  name: string;
}

export const ProfileForm: React.FC = () => {
  const { data, error, mutate } = useUser();

  const schema = z.object({
    email: z
      .string()
      .min(1, { message: "メールアドレスは必須です" })
      .email({ message: "無効なメールアドレスです" }),
    name: z.string().min(1, { message: "必須です" }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  useEffect(() => {
    if (!data) return;
    if (!data.user) return;
    reset({
      name: data.user.name,
      email: data.email,
    });
  }, [data, reset]);

  if (!data) return <div>読込み中...</div>;
  if (error) return <div>エラーが発生しました</div>;
  if (!data.user) return <div>ユーザー情報がありません</div>;

  const onSubmit = async (formdata: ProfileForm) => {
    try {
      const { email, name } = formdata;
      const body: PutRequest = {
        name,
      };
      await api.put<PutRequest, { message: string }>(`/api/user`, body);
      mutate();
      if (email === data.email) return;
      if (!confirm("メールアドレスを変更しますか？")) return;
      const { error } = await supabase.auth.updateUser(
        { email },
        { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/login` }
      );
      if (error) throw new Error(error.message);
      alert(
        "確認メールを変更前、変更後のメールアドレスに送信しました。アクセスして変更を完了してください"
      );
    } catch (e) {
      console.error(e);
      alert(e);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="ユーザーネーム"
        disabled={isSubmitting}
        id="name"
        inputMode="text"
        placeholder="ユーザーネーム"
        type="text"
        errors={errors.name}
        register={register("name")}
      />
      <Input
        label="メールアドレス"
        disabled={isSubmitting}
        id="email"
        inputMode="email"
        placeholder="メールアドレス"
        type="email"
        errors={errors.email}
        register={register("email")}
      />
      <p className="text-sm pb-2">
        メールアドレスはログイン時のメールアドレスです。
      </p>
      <Button>プロフィール更新</Button>
    </form>
  );
};
