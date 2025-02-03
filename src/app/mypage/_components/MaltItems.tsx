import { Button } from "@/app/_components/Button";
import { useMalts } from "../_hooks/useMalts";
import { useRouter } from "next/navigation";
import { getStatusLabel } from "@/app/_utils/getStatusLabel";
export const MaltItems: React.FC = () => {
  const { data, error } = useMalts();
  const { push } = useRouter();
  if (!data) return <div>読込み中...</div>;
  if (error) return <div>エラーが発生しました</div>;
  return (
    <>
      <div className="pb-2 flex flex-col gap-3">
        {data.maltArticles.slice(0, 3).map(article => (
          <div
            key={article.id}
            className="border-[1px] p-2 border-dark_brown rounded-md"
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
      <Button
        type="button"
        onClick={() => {
          push("mypage/malts");
        }}
      >
        投稿した麹調味料レシピをもっとみる
      </Button>
    </>
  );
};
