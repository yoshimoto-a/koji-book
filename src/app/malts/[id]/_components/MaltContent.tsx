"use client";
import { IndexResponse } from "@/app/_types/Malt/IndexResponse";
import { useMalt } from "../_hooks/useMalt";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useEffect } from "react";
import { Like } from "@/app/_components/Like";
import { Save } from "@/app/_components/Save";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";
import { EditButton } from "./EditButton";
import { useUser } from "@/app/_hooks/useUser";
import { getStatusLabel } from "@/app/_utils/getStatusLabel";
import Image from "next/image";
interface Props {
  initialValue: IndexResponse;
}
export const MaltContent: React.FC<Props> = ({ initialValue }) => {
  const { id } = useParams();
  const { data, error, mutate } = useMalt({ initialValue, id: id as string });
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
      <div className="flex justify-between">
        <div className="w-[150px]">
          <Button onClick={() => push("/malts")} type="button">
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

      <div className="flex flex-col gap-3 pb-5">
        {data.maltArticle.imageUrl && (
          <div className="flex justify-center py-2">
            <Image
              alt={data.maltArticle.title}
              src={data.maltArticle.imageUrl}
              width={400}
              height={400}
              className="w-full h-44 object-contain"
            />
          </div>
        )}

        {userData.user && (
          <div className="text-dark_brown border-dark_brown border-[1px] py-1 w-20 text-center rounded-md mt-3">
            {getStatusLabel(data.maltArticle.status)}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl">{data.maltArticle.title}</h3>
            <div className="text-sm">投稿者：{data.postedName}</div>
          </div>

          <div className="flex justify-end items-center gap-5">
            <Like
              articleId={id as string}
              liked={data.liked}
              likesCount={data.maltArticle.likes}
              mutate={mutate}
            />
            <Save
              articleId={id as string}
              saved={data.saved}
              savesCount={data.maltArticle.saves}
              mutate={mutate}
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl pb-2">〇材料</h3>
          <div className="whitespace-pre-wrap">{data.maltArticle.material}</div>
        </div>
        <div>
          <h3 className="text-xl pb-2">〇手順</h3>
          <div className="whitespace-pre-wrap">{data.maltArticle.tips}</div>
        </div>
        <div>
          <h3 className="text-xl pb-2">〇発酵温度</h3>
          <div className="whitespace-pre-wrap">
            {data.maltArticle.temperature}度
          </div>
        </div>
        <div>
          <h3 className="text-xl pb-2">〇発酵時間</h3>
          <div className="whitespace-pre-wrap">{data.maltArticle.time}時間</div>
        </div>
      </div>
      <div>
        <h2 className="text-xl">{data.maltArticle.title}を使ったレシピ</h2>
        <div className="pt-5">
          {data.recipeArticles.length === 0 ? (
            <div>まだ投稿がありません</div>
          ) : (
            <div className="flex flex-col gap-2">
              {data.recipeArticles.map(article => (
                <div
                  className="border-dark_brown rounded-md p-2 border-2 text-xl cursor-pointer flex float-start items-center gap-5"
                  key={article.id}
                  onClick={() => push(`/recipes/${article.id}`)}
                >
                  <div>
                    {article.imageUrl ? (
                      <Image
                        alt={article.title}
                        src={article.imageUrl}
                        width={200}
                        height={200}
                        className="w-28"
                      />
                    ) : (
                      <div className="w-28 flex justify-center">
                        <Image
                          alt=""
                          src={"/koji.png"}
                          width={200}
                          height={200}
                          className="w-20"
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-base">{article.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
