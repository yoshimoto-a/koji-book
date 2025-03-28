"use client";
import { Link } from "./Link";
import NextLink from "next/link";
import Image from "next/image";
import { RecipeArticleWithMalt } from "@/app/_types/TopPage/IndexResponse";
import { AddButton } from "@/app/malts/_components/AddButton";

interface Props {
  data: RecipeArticleWithMalt[];
}
export const RecipeContents: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <div className="flex justify-between py-2">
        <h2 className="text-lg pb-3 text-center">〇レシピの投稿</h2>
        <AddButton url="/recipes/new" />
      </div>

      <div className="grid grid-cols-2 gap-4 pb-3">
        {data.slice(0, 4).map(article => (
          <NextLink
            href={`/recipes/${article.id}`}
            key={article.id}
            className="flex flex-col gap-2 items-center bg-light_beige py-3 px-3 rounded-md"
          >
            {article.imageUrl ? (
              <Image
                src={article.imageUrl}
                alt={article.title}
                width={400}
                height={400}
                className="w-[150px] h-[100px] object-contain"
              />
            ) : (
              <div className="w-[150px] h-[100px] border-dark_brown border-[1px] rounded-md flex justify-center items-center">
                No Image
              </div>
            )}
            <div className="w-full flex justify-start">
              <div className="bg-dark_brown text-white rounded-sm px-2">
                {article.maltArticle.title}
              </div>
            </div>
            <div>{article.title}</div>
          </NextLink>
        ))}
      </div>
      <div className="py-5 text-center">
        <Link href={"/recipes"}>もっとレシピをみる</Link>
      </div>
    </div>
  );
};
