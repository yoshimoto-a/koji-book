"use client";
import { ProfileForm } from "./_components/ProfileForm";
import { MaltItems } from "./_components/MaltItems";
import { RecipeItems } from "./_components/RecipeItems";
import { FavoriteSection } from "./_components/FavoriteSection";
import { AdminArea } from "../_components/AdminArea";
export default function MyPage() {
  return (
    <div className="max-w-md mx-auto py-5 px-5">
      <AdminArea />
      <h1 className="text-xl pb-2">マイページ</h1>
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="pb-3 text-lg">プロフィール設定</h2>
          <ProfileForm />
        </div>
        <div>
          <h2 className="pb-3 text-lg">投稿した麹調味料レシピ</h2>
          <MaltItems />
        </div>
        <div>
          <h2 className="pb-3 text-lg">投稿したレシピ</h2>
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
