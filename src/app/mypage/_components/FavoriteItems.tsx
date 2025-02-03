import { RecipeArticleWithMaltTitle } from "@/app/_types/Mypage/SavesResponse";
import { MaltArticle } from "@prisma/client";
interface Props {
  articles:
    | { type: "malt"; data: MaltArticle[] }
    | { type: "recipe"; data: RecipeArticleWithMaltTitle[] };
}

// 型ガードの関数
const isRecipeArticle = (
  article: MaltArticle | RecipeArticleWithMaltTitle
): article is RecipeArticleWithMaltTitle => {
  return (article as RecipeArticleWithMaltTitle).maltArticle !== undefined;
};
export const FavoriteItems: React.FC<Props> = ({ articles }) => {
  if (articles.data.length === 0)
    return <div className="text-center">レシピがありません</div>;
  return (
    <>
      <div className="pb-2 flex flex-col gap-3">
        {articles.data.slice(0, 3).map(article => (
          <div
            key={article.id}
            className="border-[1px] p-2 border-dark_brown rounded-md"
          >
            <div className="flex justify-start items-center gap-3">
              {/* 型ガードを使って "recipe" 型のデータにアクセス */}
              {articles.type === "recipe" && isRecipeArticle(article) && (
                <div className="bg-dark_brown text-white py-1 px-2 rounded-md">
                  {article.maltArticle.title}
                </div>
              )}
              <div>{article.title}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
