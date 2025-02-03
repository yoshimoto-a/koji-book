import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { RecipesResponse } from "@/app/_types/Mypage/RecipesResponse";
import { getCurrentUser } from "../../_utils/getCurrentUser";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });

    const recipeArticles = await prisma.recipeArticle.findMany({
      where: {
        userId: user.id,
      },
      include: {
        maltArticle: true,
      },
    });

    return NextResponse.json<RecipesResponse>(
      {
        recipeArticles: recipeArticles.map(article => ({
          id: article.id,
          title: article.title,
          maltTitle: article.maltArticle.title,
          status: article.status,
        })),
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
