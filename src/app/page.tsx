import { IndexResponse } from "./_types/TopPage/IndexResponse";
import { MaltContents } from "./_components/(lp)/MaltContents";
import { RecipeContents } from "./_components/(lp)/RecipeContents";
import { Klee_One } from "next/font/google";
import { ButtonSection } from "./_components/(lp)/ButtonSection";
import { Toaster } from "react-hot-toast";
import { InstagramIcon } from "./_components/InstagramIcon";
const kleeOne = Klee_One({ weight: "400", subsets: ["latin"] });
export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/top_page`,
    {
      cache: "no-store", //キャッシュ無効化しないとSSGになってビルドエラー
    }
  );
  const { maltArticles, recipeArticles }: IndexResponse = await response.json();

  return (
    <div className="max-w-md mx-auto py-10 px-2">
      <Toaster />
      <div className="flex flex-col gap-4 items-center pb-10">
        <p className="">麹に特化したレシピ共有アプリ</p>
        <h1 className={`text-6xl ${kleeOne.className}`}>
          麹帳<span className="text-xs pl-2">-Koji Book-</span>
        </h1>
        <div className="text-center leading-7 pb-3">
          ログインしてレシピを投稿！ <br />
          ブックマーク機能で
          <br />
          作ってみたいレシピを保存🎵
        </div>
        <ButtonSection />
      </div>

      <div className="flex flex-col gap-10 pb-5">
        <MaltContents data={maltArticles} />
        <RecipeContents data={recipeArticles} />
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
      <div className="flex justify-center items-center gap-5">
        <div>お問い合わせはinstagramのDMでお願いします。</div>
        <InstagramIcon />
      </div>
    </div>
  );
}
