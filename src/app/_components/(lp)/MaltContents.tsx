"use client";
import { MaltArticle } from "@prisma/client";
import { Link } from "./Link";
import NextLink from "next/link";
import Image from "next/image";
interface Props {
  data: MaltArticle[];
}
export const MaltContents: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h2 className="text-lg pb-3 text-center">〇麹調味料の投稿</h2>
      <div className=" flex justify-center items-center flex-wrap gap-2 pb-3">
        {data.slice(0, 4).map(article => (
          <NextLink
            href={`/malts/${article.id}`}
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

            <div>{article.title}</div>
          </NextLink>
        ))}
      </div>
      <div className="py-5 text-center">
        <Link href={"/malts"}>麹調味料をみる</Link>
      </div>
    </div>
  );
};
