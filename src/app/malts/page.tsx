import { AddButton } from "./_components/AddButton";
import { IndexResponse } from "../_types/Malts/IndexResponse";
import { MaltItems } from "./_components/MaltItems";
import { PageLink } from "../_components/PageLink";
export default async function Malts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/malts`,
    {
      cache: "no-store", //キャッシュ無効化しないとSSGになってビルドエラー
    }
  );
  const data: IndexResponse = await response.json();

  return (
    <div className="max-w-md mx-auto py-5 px-5">
      <h2 className="text-xl">麹調味料のレシピ</h2>
      <div className="flex justify-between items-center py-3">
        <PageLink url="/recipes">レシピページ</PageLink>
        <AddButton url="/malts/new" />
      </div>

      <MaltItems maltsData={data} />
    </div>
  );
}
