import { IndexResponse } from "@/app/_types/Recipe/IndexResponse";
import { RecipeContent } from "./_components/RecipeContent";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/recipes/${id}`,
    { cache: "no-cache" }
  );
  const data: IndexResponse = await response.json();

  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <div className="flex justify-end pb-5"></div>
      <RecipeContent initialValue={data} />
    </div>
  );
}
