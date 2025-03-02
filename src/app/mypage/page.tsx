"use client";
import { ProfileForm } from "./_components/ProfileForm";
import { MaltItems } from "./_components/MaltItems";
import { RecipeItems } from "./_components/RecipeItems";
import { FavoriteSection } from "./_components/FavoriteSection";
import { AdminArea } from "../_components/AdminArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../_utils/supabase";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../_components/Button";
import { useRouter } from "next/navigation";
export default function MyPage() {
  const { push } = useRouter();
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      toast.success("ログアウトしました");
      push("/");
    } catch (error) {
      console.error(error);
    }
    return;
  };
  return (
    <div className="max-w-md mx-auto py-5 px-5">
      <Toaster />
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

        <Button
          onClick={logout}
          variant="light"
          type="button"
          className="flex gap-5 items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="text-dark_brown text-2xl mt-1"
          />
          <div className="font-bold">ログアウト</div>
        </Button>
      </div>
    </div>
  );
}
