import { IndexResponse } from "./_types/TopPage/IndexResponse";
import { MaltContents } from "./_components/(lp)/MaltContents";
import { RecipeContents } from "./_components/(lp)/RecipeContents";
import { ButtonSection } from "./_components/(lp)/ButtonSection";
import { InstagramIcon } from "./_components/InstagramIcon";
import { MainSectoin } from "./_components/(lp)/MainSectoin";
import { AdminArea } from "./_components/AdminArea";
export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/top_page`,
    {
      cache: "no-store", //キャッシュ無効化しないとSSGになってビルドエラー
    }
  );
  const { maltArticles, recipeArticles }: IndexResponse = await response.json();

  return (
    <div className="max-w-md mx-auto py-5 px-2">
      <AdminArea />
      <MainSectoin />
      <div className="flex flex-col gap-10 pb-5">
        <RecipeContents data={recipeArticles} />
        <MaltContents data={maltArticles} />
      </div>
      <div className="pb-5">
        <p className="text-center pb-4">
          ログインするとレシピのブックマークや
          <br />
          投稿ができるようになります！
          <br />
          <span className="text-xs">
            いいねはログインなしで出来るのでどんどんしてください🎵
          </span>
        </p>
        <div className="flex gap-5 justify-center">
          <ButtonSection />
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <div className="text-sm">お問い合わせはDMでお願いします。</div>
        <InstagramIcon />
      </div>
    </div>
  );
}
