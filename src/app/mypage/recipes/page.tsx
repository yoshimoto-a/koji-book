"use client";
import { useRouter } from "next/navigation";
import { useRecipes } from "../_hooks/useRecipes";
import { MyPageButton } from "../_components/MyPageButton";
import { getStatusLabel } from "@/app/_utils/getStatusLabel";
export default function Recipes() {
  const { data, error } = useRecipes();
  const { push } = useRouter();
  if (!data) return <div>読込み中...</div>;
  if (error) return <div>エラーが発生しました</div>;
  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <h2 className="text-xl pb-5">投稿したレシピ一覧</h2>
      <MyPageButton />
      <div className="flex flex-col gap-5">
        {data?.recipeArticles.map(article => (
          <div
            key={article.id}
            className="border-[1px] p-2 border-dark_brown rounded-md cursor-pointer flex flex-col gap-3"
            onClick={() => push(`/recipes/${article.id}`)}
          >
            <div className="flex justify-start gap-2 items-center">
              <div className="border-dark_brown border-[1px] rounded-md text-center w-20 py-1 px-2">
                {getStatusLabel(article.status)}
              </div>
              <div className="bg-dark_brown text-white rounded-md text-center w-28 py-1 px-2">
                {article.maltTitle}
              </div>
            </div>

            <div className="text-xl">{article.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
