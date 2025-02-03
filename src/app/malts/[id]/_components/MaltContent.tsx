"use client";
import { IndexResponse } from "@/app/_types/Malt/IndexResponse";
import { useMalt } from "../_hooks/useMalt";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useEffect } from "react";
import { Like } from "@/app/_components/Like";
import { Save } from "@/app/_components/Save";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";
import { EditButton } from "./EditButton";
import { useUser } from "@/app/_hooks/useUser";
interface Props {
  id: string;
  initialValue: IndexResponse;
}
export const MaltContent: React.FC<Props> = ({ initialValue, id }) => {
  const { data, error, mutate } = useMalt({ initialValue, id });
  const { session } = useSupabaseSession();
  const { push } = useRouter();
  const { data: userData, error: userError } = useUser();
  useEffect(() => {
    if (session) mutate();
  }, [session, mutate]);

  if (!data) return <div>読込み中...</div>;
  if (!userData) return <div>読込み中...</div>;
  if (error) return <div>エラー が発生しました</div>;
  if (userError) return <div>エラー が発生しました</div>;

  return (
    <div>
      <div className="flex justify-between pb-5">
        <div className="w-[150px]">
          <Button onClick={() => push("/malts ")} type="button">
            一覧に戻る
          </Button>
        </div>
        {userData.user &&
        userData.user.maltArticles.find(article => article.id === id) ? (
          <div className="w-[150px]">
            <EditButton />
          </div>
        ) : null}
      </div>

      <div className="flex justify-between">
        <h3 className="text-2xl">{data.MaltArticle.title}</h3>
        <div className="flex justify-end items-center gap-5">
          <Like
            articleId={id}
            liked={data.liked}
            likesCount={data.MaltArticle.likes}
            mutate={mutate}
          />
          <Save
            articleId={id}
            saved={data.saved}
            savesCount={data.MaltArticle.saves}
            mutate={mutate}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 pb-5">
        <div>
          <h3 className="text-xl pb-2">〇材料</h3>
          <div className="whitespace-pre-wrap">{data.MaltArticle.material}</div>
        </div>
        <div>
          <h3 className="text-xl pb-2">〇手順</h3>
          <div className="whitespace-pre-wrap">{data.MaltArticle.tips}</div>
        </div>
        <div>
          <h3 className="text-xl pb-2">〇発酵温度</h3>
          <div className="whitespace-pre-wrap">
            {data.MaltArticle.temperature}度
          </div>
        </div>
        <div>
          <h3 className="text-xl pb-2">〇発酵時間</h3>
          <div className="whitespace-pre-wrap">{data.MaltArticle.time}時間</div>
        </div>
      </div>
      <div>
        <h2 className="text-xl">{data.MaltArticle.title}を使ったレシピ</h2>
        <div className="pt-5">
          {data.RecipeArticles.length === 0 ? (
            <div>まだ投稿がありません</div>
          ) : (
            <div>
              {data.RecipeArticles.map(article => (
                <div
                  className="border-dark_brown rounded-md p-5 border-2 text-xl cursor-pointer"
                  key={article.id}
                  onClick={() => push(`/recipes/${article.id}`)}
                >
                  {article.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
