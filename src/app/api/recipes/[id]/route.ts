import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IndexResponse } from "@/app/_types/Recipe/IndexResponse";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export const GET = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    const { id } = await params;

    const recipeArticle = await prisma.recipeArticle.findUnique({
      where: {
        id,
        status: "PUBLIC",
      },
    });

    if (!recipeArticle) {
      return NextResponse.json(
        { message: "レシピが存在しません" },
        { status: 400 }
      );
    }

    return NextResponse.json<IndexResponse>({ recipeArticle }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
