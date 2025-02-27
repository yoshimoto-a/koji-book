"use client";
import Image from "next/image";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { UserActions } from "./UserActions";
import { GuestActions } from "./GuestActions";
import Link from "next/link";

export const Header: React.FC = () => {
  const { session } = useSupabaseSession();

  return (
    <header className="fixed top-0 bg-light_beige/70 w-full h-[70px] z-10">
      <div className="h-full max-w-md mx-auto flex justify-between items-center px-5">
        <Link href={"/"}>
          <Image
            alt="koji-book"
            src={"/koji.png"}
            width={70}
            height={70}
            className="w-12 h-12"
          />
        </Link>
        <div>{session ? <UserActions /> : <GuestActions />}</div>
      </div>
    </header>
  );
};
