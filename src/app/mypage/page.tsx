"use client";
import { ProfileForm } from "./_components/ProfileForm";
import { MaltItems } from "./_components/MaltItems";
import { RecipeItems } from "./_components/RecipeItems";
import { FavoriteSection } from "./_components/FavoriteSection";
export default function MyPage() {
  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <h2 className="text-xl pb-5">マイページ</h2>
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="pb-5 text-lg">プロフィール設定</h3>
          <ProfileForm />
        </div>
        <div>
          <h3 className="pb-3 text-lg">投稿した麹調味料レシピ</h3>
          <MaltItems />
        </div>
        <div>
          <h3 className="pb-3 text-lg">投稿したレシピ</h3>
          <RecipeItems />
        </div>
        <div>
          <h2 className="pb-3 text-lg">お気に入りレシピ</h2>
          <FavoriteSection />
        </div>
      </div>
    </div>
  );
}
