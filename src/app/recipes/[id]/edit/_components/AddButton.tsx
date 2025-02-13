"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";

export const AddButton: React.FC = () => {
  const { push } = useRouter();
  return (
    <div className="w-[100px]">
      <Button onClick={() => push("/recipes/new")}>投稿する</Button>
    </div>
  );
};
