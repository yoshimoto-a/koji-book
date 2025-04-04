"use client";
import { Form } from "../_components/Form";
import { Input } from "@/app/_components/Input";
import { Button } from "@/app/_components/Button";
import { useLoginFrom } from "./_hooks/useLoginForm";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
export default function Page() {
  const { register, handleSubmit, errors, isSubmitting } = useLoginFrom();

  return (
    <Form onSubmit={handleSubmit} title="ログイン">
      <Toaster />
      <div className="flex flex-col gap-3">
        <Input
          label="メールアドレス"
          disabled={isSubmitting}
          id="email"
          inputMode="email"
          placeholder="メールアドレス"
          type="email"
          errors={errors.email}
          {...register("email")}
        />
        <Input
          label="パスワード"
          disabled={isSubmitting}
          id="password"
          inputMode="text"
          placeholder="パスワード"
          type="password"
          errors={errors.password}
          {...register("password")}
        />
        <Link href="/forgot_password">パスワードを忘れた方はこちら</Link>
        <div className="mt-4 h-9">
          <Button type="submit">ログイン</Button>
        </div>
      </div>
    </Form>
  );
}
