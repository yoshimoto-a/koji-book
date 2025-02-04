"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";
import { useUser } from "@/app/_hooks/useUser";
interface Props {
  url: string;
}
export const AddButton: React.FC<Props> = ({ url }) => {
  const { push } = useRouter();
  const { data } = useUser();
  return (
    <div className={`${data?.user ? "flex justify-end pb-5" : "hidden"}`}>
      {data?.user && (
        <div className="w-[150px]">
          <Button onClick={() => push(url)}>投稿する</Button>
        </div>
      )}
    </div>
  );
};
