import { Button } from "@/app/_components/Button";
import { useRecipes } from "../_hooks/useRecipes";
import { getStatusLabel } from "@/app/_utils/getStatusLabel";
import { useRouter } from "next/navigation";

export const RecipeItems: React.FC = () => {
  const { data, error } = useRecipes();
  const { push } = useRouter();
  if (!data) return <div>読込み中...</div>;
  if (error) return <div>エラーが発生しました</div>;
  return (
    <>
      <div className="pb-2 flex flex-col gap-3">
        {data.recipeArticles.slice(0, 3).map(article => (
          <div
            key={article.id}
            className="border-[1px] p-2 border-dark_brown rounded-md cursor-pointer"
            onClick={() => {
              push(`/recipes/${article.id}/edit`);
            }}
          >
            <div className="flex justify-start items-center gap-3">
              <div className="bg-dark_brown text-white py-1 w-20 text-center rounded-md">
                {getStatusLabel(article.status)}
              </div>
              <div>{article.title}</div>
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        onClick={() => {
          push("mypage/recipes");
        }}
      >
        投稿したレシピをもっとみる
      </Button>
    </>
  );
};
