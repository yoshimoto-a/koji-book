import { SavesResponse } from "@/app/_types/Mypage/SavesResponse";
import { Tab } from "../_types/Tab";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface Props {
  data: SavesResponse;
  active: Tab[];
}
export const Contents: React.FC<Props> = ({ data, active }) => {
  const { push } = useRouter();
  const filteringData = [
    ...(active.includes("malts")
      ? data.malts.map(malt => ({ ...malt, type: "malts" }))
      : []),
    ...(active.includes("recipes")
      ? data.recipes.map(recipe => ({ ...recipe, type: "recipes" }))
      : []),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (active.length === 0) return <div>種類が選択されていません。</div>;
  return (
    <div className="flex flex-col gap-4">
      {filteringData.map(article => (
        <div
          onClick={() => push(`/${article.type}/${article.id}`)}
          key={article.id}
          className="border-[1px] p-2 border-dark_brown rounded-md cursor-pointer flex justify-start items-center gap-3"
        >
          <Image
            alt={article.title}
            width={200}
            height={200}
            src={article.imageUrl || "/koji.png"}
            className="w-20"
          />
          <div className="flex flex-col justify-start items-start gap-1">
            <div className="bg-dark_brown text-white px-2 rounded-sm">
              {article.type === "malts" ? "麹調味料" : "レシピ"}
            </div>
            <div>{article.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
