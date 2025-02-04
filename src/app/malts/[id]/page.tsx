import { IndexResponse } from "@/app/_types/Malt/IndexResponse";
import { MaltContent } from "./_components/MaltContent";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/malts/${id}`
  );
  const data: IndexResponse = await response.json();

  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <div className="flex justify-end pb-5"></div>
      <MaltContent initialValue={data} id={id} />
    </div>
  );
}
