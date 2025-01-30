import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IndexResponse } from "@/app/_types/Recipe/IndexResponse";
import { supabase } from "@/app/_utils/supabase";
import { PutRequest } from "@/app/_types/Recipe/PutRequest";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export const GET = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    const { id } = await params;
    const token = request.headers.get("Authorization") ?? "";
    const { data } = await supabase.auth.getUser(token);

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
    //ログインしてなければreturn
    if (!data.user) {
      return NextResponse.json<IndexResponse>(
        {
          recipeArticle,
          liked: false,
          saved: false,
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
    const [liked, saved] = await Promise.all([
      prisma.recipeUserAction.findUnique({
        where: {
          userId_actionType_recipeArticleId: {
            userId: user.id,
            actionType: "LIKE",
            recipeArticleId: id,
          },
        },
      }),
      prisma.recipeUserAction.findUnique({
        where: {
          userId_actionType_recipeArticleId: {
            userId: user.id,
            actionType: "SAVE",
            recipeArticleId: id,
          },
        },
      }),
    ]);
    return NextResponse.json<IndexResponse>(
      { recipeArticle, liked: liked !== null, saved: saved !== null },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};

export const PUT = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    const { id } = await params;
    const { material, status, tips, title }: PutRequest = await request.json();
    await prisma.recipeArticle.update({
      where: { id },
      data: {
        material,
        status,
        tips,
        title,
      },
    });
    return NextResponse.json({ message: "success!" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
