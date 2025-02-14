"use client";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Klee_One } from "next/font/google";
import { ButtonSection } from "./ButtonSection";
const kleeOne = Klee_One({ weight: "400", subsets: ["latin"] });

export const MainSectoin: React.FC = () => {
  const { session } = useSupabaseSession();
  if (!session) {
    return (
      <div className="flex flex-col gap-4 items-center pb-10">
        <p className="">麹に特化したレシピ共有アプリ</p>
        <h1 className={`font-bold text-6xl ${kleeOne.className}`}>
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
    );
  }

  return (
    <h1 className={`text-center font-bold text-2xl ${kleeOne.className}`}>
      麹帳<span className="text-[8px] pl-2">-Koji Book-</span>
    </h1>
  );
};
