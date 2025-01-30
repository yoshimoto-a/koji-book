import { Button } from "@/app/_components/Button";
import { useRouter, usePathname } from "next/navigation";
export const EditButton: React.FC = () => {
  const { push } = useRouter();
  const currentPage = usePathname();
  return (
    <div>
      <Button type="button" onClick={() => push(`${currentPage}/edit`)}>
        編集する
      </Button>
    </div>
  );
};
