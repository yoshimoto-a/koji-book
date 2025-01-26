import { AddButton } from "./_components/AddButton";
import { IndexResponse } from "../_types/Malts/IndexResponse";
import { MaltItems } from "./_components/MaltItems";
export default async function Malts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/malts`,
    {}
  );

  const data: IndexResponse = await response.json();

  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <h2 className="text-xl pb-5">麹調味料のレシピ</h2>
      <div className="flex justify-end pb-10">
        <AddButton />
      </div>
      <MaltItems maltsData={data} />
    </div>
  );
}
