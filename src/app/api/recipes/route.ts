import { IndexResponse } from "@/app/_types/Recipes/IndexResponse";
import { buildPrisma } from "@/app/_utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import { buildError } from "../_utils/buildError";
import { PostRequest } from "@/app/_types/Recipes/PostRequest";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { supabase } from "@/app/_utils/supabase";
import { Status } from "@prisma/client";
export const POST = async (request: NextRequest) => {
  const prisma = await buildPrisma();

  try {
    const { user } = await getCurrentUser({ request });
    const {
      material,
      status,
      tips,
      title,
      maltArticleId,
      imageUrl,
    }: PostRequest = await request.json();

    await prisma.recipeArticle.create({
      data: {
        userId: user.id,
        material,
        status,
        tips,
        title,
        maltArticleId,
        imageUrl,
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
    const url = new URL(request.url);
    //意図しないスペース入ったため削除処理入れる
    const searchword = url.searchParams
      .get("keyword")
      ?.replace(/\u200B/g, "")
      .trim();
    const page = parseInt(url.searchParams.get("page") || "0");
    const pageSize = 15;
    const skip = page * pageSize;
    const take = pageSize;
    const token = request.headers.get("Authorization") ?? "";
    const { data } = await supabase.auth.getUser(token);

    const whereCondition = {
      status: Status.PUBLIC,
      OR: [
        {
          title: {
            contains: searchword || "",
          },
        },
        {
          tips: {
            contains: searchword || "",
          },
        },
        {
          material: {
            contains: searchword || "",
          },
        },
        {
          maltArticle: {
            title: {
              contains: searchword || "",
            },
          },
        },
      ],
    };
    const [recipeArticles, totalCount] = await Promise.all([
      prisma.recipeArticle.findMany({
        where: whereCondition,
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: {
          maltArticle: true,
          user: true,
        },
      }),
      prisma.recipeArticle.count({
        where: whereCondition,
      }),
    ]);
    const totalPages = Math.ceil(totalCount / take);

    //ログインしてなければreturn
    if (!data.user) {
      return NextResponse.json<IndexResponse>(
        {
          recipeArticles: recipeArticles.map(article => ({
            article,
            malt: article.maltArticle.title,
            like: false,
            save: false,
            userName: article.user.name,
          })),
          totalPages,
        },
        { status: 200 }
      );
    }

    const user = await getCurrentUser({ request });

    const actions = await prisma.recipeUserAction.findMany({
      where: { userId: user.user.id },
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
                action.recipeArticleId === article.id
            ),
            save: !!actions.find(
              action =>
                action.actionType === "SAVE" &&
                action.recipeArticleId === article.id
            ),
            userName: article.user.name,
          };
        }),
        totalPages,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
