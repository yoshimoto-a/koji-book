import { FavoriteItems } from "./FavoriteItems";
import { useSaves } from "../_hooks/useSaves";
import { Button } from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import { Loading } from "./Loading";

export const FavoriteSection: React.FC = () => {
  const { data, error } = useSaves();
  const { push } = useRouter();
  if (!data) return <Loading />;
  if (error) return <div>エラーが発生しました</div>;
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="pb-1">〇麹調味料</h3>
        <FavoriteItems articles={{ type: "malt", data: data.malts }} />
      </div>
      <div>
        <h3 className="pb-1">〇レシピ</h3>
        <FavoriteItems articles={{ type: "recipe", data: data.recipes }} />
      </div>
      <Button
        type="button"
        onClick={() => {
          push(`/mypage/favorites`);
        }}
      >
        お気に入りレシピをもっとみる
      </Button>
    </div>
  );
};
