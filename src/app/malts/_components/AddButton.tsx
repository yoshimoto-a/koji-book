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
    <div className={`${data?.user ? "" : "hidden"}`}>
      {data?.user && (
        <div className="w-[100px]">
          <Button onClick={() => push(url)}>投稿する</Button>
        </div>
      )}
    </div>
  );
};
