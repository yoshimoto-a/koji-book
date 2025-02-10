"use client";
import { ArticleForm } from "./_components/ArticleForm";
import { useRecipe } from "../_hooks/useRecipe";
import { useParams } from "next/navigation";

export default function EditPage() {
  const { id } = useParams();
  const { data, error } = useRecipe({ id: id as string });

  if (!data) return <div className="text-center pt-10">読込み中...</div>;
  if (error)
    return <div className="text-center pt-10">エラー が発生しました</div>;
  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <h2 className="text-2xl">編集する</h2>
      <ArticleForm data={data} />
    </div>
  );
}
