import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Unread } from "./Unread";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import Link from "next/link";
import { supabase } from "../_utils/supabase";
import toast from "react-hot-toast";
import { useUser } from "../_hooks/useUser";

export const UserActions: React.FC = () => {
  const { session } = useSupabaseSession();
  const { data } = useUser();
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      toast.success("ログアウトしました");
    } catch (error) {
      console.error(error);
    }
  };

  if (!session) return null;

  return (
    <div className="flex justify-start items-center gap-3">
      {data?.user?.role === "ADMIN" && (
        <Link href={"/admin"} className="flex flex-col gap-1 items-center">
          <FontAwesomeIcon
            icon={faGear}
            className="text-dark_brown text-2xl mt-1"
          />
          <div className="text-xs">管理画面</div>
        </Link>
      )}
      <Unread />
      <Link href={"/mypage"} className="flex flex-col gap-1 items-center">
        <FontAwesomeIcon
          icon={faUser}
          className="text-dark_brown text-2xl mt-1"
        />
        <div className="text-xs">マイページ</div>
      </Link>
      <button
        onClick={logout}
        type="button"
        className="flex flex-col gap-1 items-center justify-center"
      >
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className="text-dark_brown text-2xl mt-1"
        />
        <div className="text-xs">ログアウト</div>
      </button>
    </div>
  );
};
