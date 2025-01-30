"use client";
import { IndexResponse } from "@/app/_types/Recipe/IndexResponse";
import { useRecipe } from "../_hooks/useRecipe";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useEffect } from "react";
import { Like } from "@/app/_components/Like";
import { Save } from "@/app/_components/Save";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";
import { EditButton } from "@/app/malts/[id]/_components/EditButton";
import { useUser } from "@/app/_hooks/useUser";
interface Props {
  id: string;
  initialValue: IndexResponse;
}
export const RecipeContent: React.FC<Props> = ({ initialValue, id }) => {
  const { data, error, mutate } = useRecipe({ initialValue, id });
  const { session } = useSupabaseSession();
  const { push } = useRouter();
  const { data: user, mutate: updateUser } = useUser();
  useEffect(() => {
    if (session) {
      mutate();
      updateUser();
    }
  }, [session]);

  if (!data) return <div>読込み中...</div>;
  if (error) return <div>エラー が発生しました</div>;
  console.log(data);
  return (
    <div>
      <div className="flex justify-between pb-5">
        <div className="w-[150px]">
          <Button onClick={() => push("/recipes ")} type="button">
            一覧に戻る
          </Button>
        </div>
        {!!user?.recipeArticles.find(article => article.id === id) ? (
          <div className="w-[150px]">
            <EditButton />
          </div>
        ) : null}
      </div>

      <div className="flex justify-between">
        <h3 className="text-2xl">{data.recipeArticle.title}</h3>
        <div className="flex justify-end items-center gap-5">
          <Like
            articleId={id}
            liked={data.liked}
            likesCount={data.recipeArticle.likes}
            mutate={mutate}
          />
          <Save
            articleId={id}
            saved={data.saved}
            savesCount={data.recipeArticle.saves}
            mutate={mutate}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 pb-5">
        <div>
          <h3 className="text-xl pb-2">〇材料</h3>
          <div className="whitespace-pre-wrap">
            {data.recipeArticle.material}
          </div>
        </div>
        <div>
          <h3 className="text-xl pb-2">〇手順</h3>
          <div className="whitespace-pre-wrap">{data.recipeArticle.tips}</div>
        </div>
      </div>
    </div>
  );
};
