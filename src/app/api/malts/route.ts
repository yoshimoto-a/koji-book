import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "../_utils/buildError";
import { PostRequest } from "@/app/_types/Malts/PostRequest";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { IndexResponse } from "@/app/_types/Malts/IndexResponse";
import { supabase } from "@/app/_utils/supabase";
export const POST = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  const {
    maltRole,
    material,
    status,
    temperature,
    time,
    tips,
    title,
  }: PostRequest = await request.json();

  try {
    const user = await getCurrentUser({ request });

    await prisma.maltArticle.create({
      data: {
        userId: user.id,
        maltRole,
        material,
        status,
        temperature,
        time,
        tips,
        title,
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

    const maltArticles = await prisma.maltArticle.findMany({
      where: { status: "PUBLIC" },
      orderBy: { createdAt: "desc" },
    });

    //ログインしてなければreturn
    if (!data.user) {
      return NextResponse.json<IndexResponse>(
        {
          maltArticles: maltArticles.map(article => ({
            article,
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
        maltArticles: maltArticles.map(article => {
          return {
            article,
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
