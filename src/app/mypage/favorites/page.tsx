"use client";
import { useSaves } from "../_hooks/useSaves";
import { useState } from "react";
import { Tab } from "./_types/Tab";
import { Tabs } from "./_components/Tabs";
import { Contents } from "./_components/Contents";
export default function MyPage() {
  const { data, error } = useSaves();
  const [active, setActive] = useState<Tab[]>(["malts", "recipes"]);
  if (!data) return <div>読込み中...</div>;
  if (error) return <div>エラー が発生しました</div>;
  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <h2 className="text-xl pb-5">お気に入り登録したレシピ一覧</h2>

      <Tabs active={active} setActive={setActive} />
      <div className="pt-12">
        <Contents data={data} active={active} />
      </div>
    </div>
  );
}
