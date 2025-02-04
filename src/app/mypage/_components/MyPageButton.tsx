import { Button } from "@/app/_components/Button";
import { useRouter } from "next/navigation";
export const MyPageButton: React.FC = () => {
  const { push } = useRouter();
  return (
    <div className="flex justify-end pb-5">
      <div className="w-1/2">
        <Button type="button" onClick={() => push("/mypage")}>
          マイページへ戻る
        </Button>
      </div>
    </div>
  );
};
