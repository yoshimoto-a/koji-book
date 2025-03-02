"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSignIn } from "../_hooks/useSignIn";
import Link from "next/link";
export const GuestActions: React.FC = () => {
  const { signIn } = useSignIn();

  return (
    <div className="flex justify-start items-center gap-3">
      <Link href={"/signup"} className="flex flex-col gap-1 items-center">
        <FontAwesomeIcon
          icon={faUserPlus}
          className="text-dark_brown text-2xl mt-1"
        />
        <div className="text-xs">サインアップ</div>
      </Link>
      <button
        onClick={async () => await signIn()}
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
  );
};
