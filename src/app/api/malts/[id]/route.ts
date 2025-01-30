import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IndexResponse } from "@/app/_types/Malt/IndexResponse";
import { supabase } from "@/app/_utils/supabase";
import { PutRequest } from "@/app/_types/Malt/PutRequest";

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
    const MaltArticle = await prisma.maltArticle.findUnique({
      where: {
        id,
        status: "PUBLIC",
      },
      include: {
        recipeArticles: true,
      },
    });

    if (!MaltArticle) {
      return NextResponse.json(
        { message: "麹調味料データが存在しません" },
        { status: 400 }
      );
    }
    //ログインしてなければreturn
    if (!data.user) {
      return NextResponse.json<IndexResponse>(
        {
          MaltArticle,
          RecipeArticles: MaltArticle.recipeArticles,
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
      prisma.maltUserAction.findUnique({
        where: {
          userId_actionType_maltArticleId: {
            userId: user.id,
            actionType: "LIKE",
            maltArticleId: id,
          },
        },
      }),
      prisma.maltUserAction.findUnique({
        where: {
          userId_actionType_maltArticleId: {
            userId: user.id,
            actionType: "SAVE",
            maltArticleId: id,
          },
        },
      }),
    ]);

    return NextResponse.json<IndexResponse>(
      {
        MaltArticle,
        RecipeArticles: MaltArticle.recipeArticles,
        liked: liked !== null,
        saved: saved !== null,
      },
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
    const {
      maltRole,
      material,
      status,
      temperature,
      time,
      tips,
      title,
    }: PutRequest = await request.json();
    await prisma.maltArticle.update({
      where: { id },
      data: {
        maltRole,
        material,
        status,
        temperature,
        time,
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
