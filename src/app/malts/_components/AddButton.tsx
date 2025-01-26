"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";

export const AddButton: React.FC = () => {
  const { push } = useRouter();
  return (
    <div className="w-[150px]">
      <Button onClick={() => push("/malts/new")}>投稿する</Button>
    </div>
  );
};
