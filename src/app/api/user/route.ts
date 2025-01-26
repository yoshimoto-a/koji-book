import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IndexResponse } from "@/app/_types/Mypage/IndexResponse";
import { getCurrentUser } from "../_utils/getCurrentUser";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const user = await getCurrentUser({ request });

    const [maltArticles, recipeArticles, malts, recipes] = await Promise.all([
      prisma.maltArticle.findMany({
        where: {
          userId: user.id,
        },
      }),
      prisma.recipeArticle.findMany({
        where: {
          userId: user.id,
        },
      }),
      prisma.maltUserAction.findMany({
        where: {
          userId: user.id,
          actionType: "SAVE",
        },
      }),
      prisma.recipeUserAction.findMany({
        where: {
          userId: user.id,
          actionType: "SAVE",
        },
      }),
    ]);

    return NextResponse.json<IndexResponse>(
      {
        user,
        maltArticles,
        recipeArticles,
        saves: {
          malts,
          recipes,
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
