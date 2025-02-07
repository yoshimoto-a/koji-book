import { AddButton } from "../malts/_components/AddButton";
import { IndexResponse } from "../_types/Recipes/IndexResponse";
import { RecipeItems } from "./_components/RecipeItems";
import { PageLink } from "../_components/PageLink";
export default async function Recipes() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/recipes`,
    {
      cache: "no-store", //キャッシュ無効化しないとSSGになってビルドエラー
    }
  );
  const data: IndexResponse = await response.json();
  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <h2 className="text-xl">麹調味料を使ったレシピ</h2>

      <div className="flex justify-between items-center py-3">
        <PageLink url="/malts">麹調味料ページ</PageLink>
        <AddButton url="/recipes/new" />
      </div>
      <RecipeItems recipeData={data} />
    </div>
  );
}
