"use client";
import { IndexResponse } from "@/app/_types/Recipe/IndexResponse";
import { useRecipe } from "../_hooks/useRecipe";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useEffect } from "react";
import { Like } from "@/app/_components/Like";
import { Save } from "@/app/_components/Save";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";
import { EditButton } from "@/app/malts/[id]/_components/EditButton";
import { useUser } from "@/app/_hooks/useUser";
import Image from "next/image";
import { getStatusLabel } from "@/app/_utils/getStatusLabel";
import { CommentPost } from "../../_components/CommentPost";
import { Comment } from "./Comment";
interface Props {
  initialValue: IndexResponse;
}
export const RecipeContent: React.FC<Props> = ({ initialValue }) => {
  const { id } = useParams();
  const { data, error, mutate } = useRecipe({ initialValue, id: id as string });
  const { session } = useSupabaseSession();
  const { push } = useRouter();
  const { data: userData, error: userError, mutate: updateUser } = useUser();

  useEffect(() => {
    if (session) {
      mutate();
      updateUser();
    }
  }, [session, updateUser, mutate]);

  if (!data) return <div>読込み中...</div>;
  if (!userData) return <div>読込み中...</div>;
  if (error) return <div>エラー が発生しました</div>;
  if (userError) return <div>エラー が発生しました</div>;
  const isOwnPost =
    userData.user &&
    userData.user.recipeArticles.find(article => article.id === id);
  return (
    <div>
      <div className="flex justify-between pb-5">
        <div className="w-[150px]">
          <Button onClick={() => push("/recipes ")} type="button">
            一覧に戻る
          </Button>
        </div>
        {isOwnPost ? (
          <div className="w-[150px]">
            <EditButton />
          </div>
        ) : null}
      </div>
      <div className="flex justify-center py-2">
        {data.recipeArticle.imageUrl && (
          <Image
            alt={data.recipeArticle.title}
            src={data.recipeArticle.imageUrl}
            width={400}
            height={400}
            className="w-full h-44 object-contain"
          />
        )}
      </div>
      {isOwnPost ? (
        <div className="text-dark_brown border-dark_brown border-[1px] py-1 w-20 text-center rounded-md mt-2">
          {getStatusLabel(data.recipeArticle.status)}
        </div>
      ) : null}

      <div className="flex justify-between items-center pb-2">
        <div className="">
          <h3 className="text-2xl">{data.recipeArticle.title}</h3>
          <div className="text-sm">投稿者:{data.postedName}</div>
        </div>
        <div className="flex justify-end items-center gap-5">
          <Like
            articleId={id as string}
            liked={data.liked}
            likesCount={data.recipeArticle.likes}
            mutate={mutate}
          />
          <Save
            articleId={id as string}
            saved={data.saved}
            savesCount={data.recipeArticle.saves}
            mutate={mutate}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 pb-5">
        <div className="flex justify-start items-center">
          <div
            className="bg-dark_brown text-white py-1 px-2 rounded-sm inline-block text-sm cursor-pointer"
            onClick={() => push(`/malts/${data.recipeArticle.maltArticleId}`)}
          >
            {data.maltTitle}
          </div>
        </div>

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
      {session && <CommentPost />}
      {data.comments.length === 0 ? (
        <p>コメントはありません</p>
      ) : (
        <div className="flex flex-col gap-2">
          {data.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
