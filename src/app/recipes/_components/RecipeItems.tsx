"use client";
import { IndexResponse } from "@/app/_types/Recipes/IndexResponse";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useEffect } from "react";
import { Like } from "@/app/_components/Like";
import { Save } from "@/app/_components/Save";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";
import { useRecipes } from "../_hooks/useRecipes";
import { Malt } from "./Malt";
import Image from "next/image";
import { Paginate } from "@/app/_components/Pagenate";
import { useSearchParamsState } from "../_hooks/useSearchParamsState";
import { SearchForm } from "@/app/_components/SearchForm";
interface Props {
  recipeData: IndexResponse;
}
export const RecipeItems: React.FC<Props> = ({ recipeData }) => {
  const { currentPage, setCurrentPage, searchKeyword, setSearchKeyword } =
    useSearchParamsState();

  const { data, error, mutate } = useRecipes({
    initialValue: recipeData,
    searchKeyword,
    currentPage,
  });
  const { session } = useSupabaseSession();
  const { push } = useRouter();
  useEffect(() => {
    if (session) mutate();
  }, [session, mutate]);

  if (!data) return <div>読込み中...</div>;
  if (error) return <div>エラー が発生しました</div>;

  return (
    <div className="flex flex-col gap-5">
      <SearchForm onSearch={setSearchKeyword} initialKeyword={searchKeyword} />
      {data.recipeArticles.map(recipeArticle => (
        <div
          key={recipeArticle.article.id}
          className="bg-light_beige py-4 px-3 rounded-md flex flex-col gap-3"
        >
          {recipeArticle.article.imageUrl && (
            <div className="flex  justify-center">
              <Image
                alt={recipeArticle.article.title}
                src={recipeArticle.article.imageUrl}
                width={400}
                height={400}
                className="w-full h-44 object-contain"
              />
            </div>
          )}
          <div className="">
            <Malt item={recipeArticle.malt} />
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl">{recipeArticle.article.title}</h3>
            <div className=" flex gap-5">
              <Like
                articleId={recipeArticle.article.id}
                liked={recipeArticle.like}
                likesCount={recipeArticle.article.likes}
                mutate={mutate}
              />
              <Save
                articleId={recipeArticle.article.id}
                saved={recipeArticle.save}
                savesCount={recipeArticle.article.saves}
                mutate={mutate}
              />
            </div>
          </div>

          <div className="">
            <h3>〇作り方</h3>
            <div className="line-clamp-1">{recipeArticle.article.tips}</div>
          </div>
          <Button
            type="button"
            onClick={() => {
              push(`recipes/${recipeArticle.article.id}`);
            }}
          >
            材料・作り方を見る
          </Button>
        </div>
      ))}
      <div className="mt-4">
        <Paginate
          pageCount={data.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
