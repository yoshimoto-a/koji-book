import { IndexResponse } from "./_types/TopPage/IndexResponse";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/top_page`
  );
  const { maltArticles, recipeArticles }: IndexResponse = await response.json();

  return (
    <div className="max-w-md mx-auto pt-20">
      <h1 className="text-2xl pb-20">トップページ</h1>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-xl text-center pb-10">麹調味料のレシピ</h2>
          {maltArticles.map(maltArticle => (
            <div key={maltArticle.id} className="flex justify-between">
              <div>{maltArticle.title}</div>
              <div>
                <div>いいね {maltArticle.likes}回</div>
                <div>保存 {maltArticle.saves}人</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl text-center pb-10">麹調味料を使ったレシピ</h2>
          {recipeArticles.map(recipeArticle => (
            <div key={recipeArticle.id} className="flex justify-between">
              <div className="flex gap-1 items-center">
                <div>{recipeArticle.title}</div>
                <div className="text-sm bg-light_beige px-2 py-1 rounded-md">
                  {recipeArticle.maltArticle.title}
                </div>
              </div>
              <div>
                <div>いいね {recipeArticle.likes}回</div>
                <div>保存 {recipeArticle.saves}人</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
