"use client";
import { IndexResponse } from "@/app/_types/Malts/IndexResponse";
import { useMalts } from "../_hooks/useMalts";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useEffect } from "react";
import { Like } from "@/app/_components/Like";
import { Save } from "@/app/_components/Save";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";
interface Props {
  maltsData: IndexResponse;
}
export const MaltItems: React.FC<Props> = ({ maltsData }) => {
  const { data, error, mutate } = useMalts({ initialValue: maltsData });
  const { session } = useSupabaseSession();
  const { push } = useRouter();
  useEffect(() => {
    if (session) mutate();
  }, [session, mutate]);
  if (!data) return <div>読込み中...</div>;
  if (error) return <div>エラー が発生しました</div>;

  return (
    <div className="flex flex-col gap-5">
      {data.maltArticles.map(maltArticle => (
        <div
          key={maltArticle.article.id}
          className="bg-light_beige py-2 px-3 rounded-md flex flex-col gap-5"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl">{maltArticle.article.title}</h3>
            <div className=" flex gap-5">
              <Like
                articleId={maltArticle.article.id}
                liked={maltArticle.like}
                likesCount={maltArticle.article.likes}
                mutate={mutate}
              />
              <Save
                articleId={maltArticle.article.id}
                saved={maltArticle.save}
                savesCount={maltArticle.article.saves}
                mutate={mutate}
              />
            </div>
          </div>
          <div className="flex justify-start gap-5">
            <p>{maltArticle.article.temperature}度</p>
            <p>{maltArticle.article.time}時間</p>
          </div>
          <div className="">
            <h3>〇作り方</h3>
            <div className="line-clamp-1">{maltArticle.article.tips}</div>
          </div>
          <Button
            type="button"
            onClick={() => {
              push(`malts/${maltArticle.article.id}`);
            }}
          >
            作り方を見る
          </Button>
        </div>
      ))}
    </div>
  );
};
