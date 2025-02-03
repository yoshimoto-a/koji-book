import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { SavesResponse } from "@/app/_types/Mypage/SavesResponse";
import { getCurrentUser } from "../../_utils/getCurrentUser";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });

    const [malts, recipes] = await Promise.all([
      prisma.maltUserAction.findMany({
        where: {
          userId: user.id,
          actionType: "SAVE",
        },
        include: {
          maltArticle: true,
        },
      }),
      prisma.recipeUserAction.findMany({
        where: {
          userId: user.id,
          actionType: "SAVE",
        },
        include: {
          recipeArticle: {
            include: {
              maltArticle: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json<SavesResponse>(
      {
        malts: malts.map(malt => malt.maltArticle),
        recipes: recipes.map(recipe => recipe.recipeArticle),
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
