import { AddButton } from "../malts/_components/AddButton";
import { IndexResponse } from "../_types/Recipes/IndexResponse";
import { RecipeItems } from "./_components/RecipeItems";
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
      <h2 className="text-xl pb-5">麹調味料を使ったレシピ</h2>
      <AddButton url="/recipes/new" />
      <RecipeItems recipeData={data} />
    </div>
  );
}
