import { IndexResponse } from "@/app/_types/Recipes/IndexResponse";
import { buildPrisma } from "@/app/_utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import { buildError } from "../_utils/buildError";
import { PostRequest } from "@/app/_types/Recipes/PostRequest";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { supabase } from "@/app/_utils/supabase";
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
export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const token = request.headers.get("Authorization") ?? "";
    const { data } = await supabase.auth.getUser(token);
    const recipeArticles = await prisma.recipeArticle.findMany({
      where: {
        status: "PUBLIC",
      },
      orderBy: { createdAt: "desc" },
      include: {
        maltArticle: true,
      },
    });
    //ログインしてなければreturn
    if (!data.user) {
      return NextResponse.json<IndexResponse>(
        {
          recipeArticles: recipeArticles.map(article => ({
            article,
            malt: article.maltArticle.title,
            like: false,
            save: false,
          })),
        },
        { status: 200 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "user is not found!",
        },
        { status: 404 }
      );
    }

    const actions = await prisma.maltUserAction.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json<IndexResponse>(
      {
        recipeArticles: recipeArticles.map(article => {
          return {
            article,
            malt: article.maltArticle.title,
            like: !!actions.find(
              action =>
                action.actionType === "LIKE" &&
                action.maltArticleId === article.id
            ),
            save: !!actions.find(
              action =>
                action.actionType === "SAVE" &&
                action.maltArticleId === article.id
            ),
          };
        }),
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
