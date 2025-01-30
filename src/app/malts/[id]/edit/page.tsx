import { IndexResponse } from "@/app/_types/Malt/IndexResponse";
import { ArticleForm } from "./_components/AriticleForm";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function EditPage({ params }: Props) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/malts/${id}`
  );
  const data: IndexResponse = await response.json();

  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <h2 className="text-2xl">編集する</h2>
      <ArticleForm data={data} />
    </div>
  );
}
