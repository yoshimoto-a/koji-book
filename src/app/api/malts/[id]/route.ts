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
    const user = data.user
      ? await prisma.user.findUnique({
          where: {
            supabaseUserId: data.user.id,
          },
        })
      : null;

    const maltArticle = await prisma.maltArticle.findUnique({
      where: {
        id,
        OR: [
          { status: "PUBLIC" },
          { status: "DRAFT", userId: user ? user.id : undefined },
          { status: "PENDING_APPROVAL", userId: user ? user.id : undefined },
        ],
      },
      include: {
        recipeArticles: true,
        user: true,
      },
    });

    //記事が見つからない場合
    if (!maltArticle) {
      return NextResponse.json(
        { message: "麹調味料データが存在しません" },
        { status: 400 }
      );
    }
    //ログインしてなければreturn
    if (!data.user) {
      return NextResponse.json<IndexResponse>(
        {
          maltArticle,
          recipeArticles: maltArticle.recipeArticles,
          postedName: maltArticle.user.name,
          liked: false,
          saved: false,
        },
        { status: 200 }
      );
    }

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
        maltArticle,
        recipeArticles: maltArticle.recipeArticles,
        postedName: maltArticle.user.name,
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
    console.log(request);
    const {
      maltRole,
      material,
      status,
      temperature,
      time,
      tips,
      title,
      imageUrl,
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
        imageUrl,
      },
    });
    return NextResponse.json({ message: "success!" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
