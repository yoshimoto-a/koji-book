import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { Unread } from "./Unread";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import Link from "next/link";
import { useUser } from "../_hooks/useUser";

export const UserActions: React.FC = () => {
  const { session } = useSupabaseSession();
  const { data } = useUser();

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
    </div>
  );
};
