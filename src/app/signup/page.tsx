"use client";
import { useSignup } from "./_hooks/useSignup";
import { Input } from "../_components/Input";
import { Button } from "../_components/Button";
import { Form } from "../_components/Form";

export default function Page() {
  const { register, handleSubmit, errors, isSubmitting } = useSignup();
  return (
    <Form onSubmit={handleSubmit} title="サインアップ">
      <div className="flex flex-col gap-3">
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
        <Input
          label="パスワード"
          disabled={isSubmitting}
          id="password"
          inputMode="text"
          placeholder="パスワード"
          type="password"
          errors={errors.password}
          register={register("password")}
        />
        <div className="mt-4 h-9">
          <Button type="submit">登録</Button>
        </div>
      </div>
    </Form>
  );
}
