import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IndexResponse } from "@/app/_types/Mypage/IndexResponse";
import { getCurrentUser } from "../_utils/getCurrentUser";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const user = await getCurrentUser({ request });
    const maltArticles = await prisma.maltArticle.findMany({
      where: {
        userId: user.id,
      },
    });
    const recipeArticles = await prisma.recipeArticle.findMany({
      where: {
        userId: user.id,
      },
    });
    const saves = await prisma.userAction.findMany({
      where: {
        userId: user.id,
        actionType: "SAVE",
      },
    });

    return NextResponse.json<IndexResponse>(
      {
        user,
        maltArticles,
        recipeArticles,
        save: {
          malt: saves.filter(item => item.articleCategory === "MALT"),
          recipe: saves.filter(item => item.articleCategory === "RECIPE"),
        },
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
