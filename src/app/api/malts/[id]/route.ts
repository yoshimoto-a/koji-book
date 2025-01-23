import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IndexResponse } from "@/app/_types/Malt/IndexResponse";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export const GET = async (request: NextRequest, { params }: Props) => {
  console.log(params);
  const prisma = await buildPrisma();
  try {
    const { id } = await params;

    const MaltArticle = await prisma.maltArticle.findUnique({
      where: {
        id,
        status: "PUBLIC",
      },
      include: {
        recipeArticles: true,
      },
    });

    if (!MaltArticle) {
      return NextResponse.json(
        { message: "麹調味料データが存在しません" },
        { status: 400 }
      );
    }

    return NextResponse.json<IndexResponse>(
      { MaltArticle, RecipeArticles: MaltArticle.recipeArticles },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
