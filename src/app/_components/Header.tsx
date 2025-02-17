"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
  faUserPlus,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../_utils/supabase";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { useRouter } from "next/navigation";
import { useSignIn } from "../_hooks/useSignIn";
import toast from "react-hot-toast";
import { Unread } from "./Unread";
export const Header: React.FC = () => {
  const { session } = useSupabaseSession();

  const { push } = useRouter();
  const { signIn } = useSignIn();
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
  return (
    <header className="fixed top-0 bg-light_beige/70 w-full h-[70px] z-10">
      <div className="h-full max-w-md mx-auto flex justify-between items-center px-5">
        <button onClick={() => push("/")}>
          <Image
            alt="koji-book"
            src={"/koji.png"}
            width={70}
            height={70}
            className="w-12 h-12"
          />
        </button>
        <div>
          {!session ? (
            <div className="flex justify-start items-center gap-3">
              <button
                onClick={() => push("/signup")}
                type="button"
                className="flex flex-col gap-1 items-center"
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="text-dark_brown text-2xl mt-1"
                />
                <div className="text-xs">サインアップ</div>
              </button>
              <button
                onClick={signIn}
                type="button"
                className="flex flex-col gap-1 items-center"
              >
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  className="text-dark_brown text-2xl mt-1"
                />
                <div className="text-xs">サインイン</div>
              </button>
            </div>
          ) : (
            <div className="flex justify-start items-center gap-3">
              <Unread />
              <button
                onClick={() => push("/mypage")}
                type="button"
                className="flex flex-col gap-1 items-center"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-dark_brown text-2xl mt-1"
                />
                <div className="text-xs">マイページ</div>
              </button>
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
          )}
        </div>
      </div>
    </header>
  );
};
