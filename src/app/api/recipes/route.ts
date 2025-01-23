import { IndexResponse } from "@/app/_types/Recipes/IndexResponse";
import { buildPrisma } from "@/app/_utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import { buildError } from "../_utils/buildError";
import { PostRequest } from "@/app/_types/Recipes/PostRequest";
import { getCurrentUser } from "../_utils/getCurrentUser";
export const POST = async (request: NextRequest) => {
  const prisma = await buildPrisma();

  try {
    const user = await getCurrentUser({ request });
    const { material, status, tips, title, maltArticleId }: PostRequest =
      await request.json();

    await prisma.recipeArticle.create({
      data: {
        userId: user.id,
        material,
        status,
        tips,
        title,
        maltArticleId,
      },
    });

    return NextResponse.json(
      {
        message: "success!",
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
export const GET = async () => {
  const prisma = await buildPrisma();
  try {
    const recipeArticles = await prisma.recipeArticle.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json<IndexResponse>(
      {
        recipeArticles,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
