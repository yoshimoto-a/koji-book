"use client";
import { useRouter } from "next/navigation";
import { useMalts } from "../_hooks/useMalts";
import { MyPageButton } from "../_components/MyPageButton";
import { getStatusLabel } from "@/app/_utils/getStatusLabel";
import { AddButton } from "@/app/malts/_components/AddButton";
export default function Malts() {
  const { push } = useRouter();
  const { data, error } = useMalts();
  if (!data) return <div>読込み中...</div>;
  if (error) return <div>エラーが発生しました</div>;
  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <div className="flex justify-between">
        <h2 className="text-xl pb-5">投稿したレシピ一覧</h2>
        <AddButton url="/malts/new" />
      </div>

      <MyPageButton />
      <div className="flex flex-col gap-5">
        {data.maltArticles.map(article => (
          <div
            key={article.id}
            className="border-[1px] p-2 border-dark_brown rounded-md cursor-pointer"
            onClick={() => push(`/malts/${article.id}`)}
          >
            <div className="flex justify-start items-center gap-3">
              <div className="bg-dark_brown text-white py-1 w-20 text-center rounded-md">
                {getStatusLabel(article.status)}
              </div>
              <div>{article.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
