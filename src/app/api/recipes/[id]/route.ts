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
//マイページから下書きにアクセスした場合に対応する必要がある→エンドポイントわける？
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

    // ユーザーが認証されている場合の条件を追加
    const recipeArticle = await prisma.recipeArticle.findUnique({
      where: {
        id,
        OR: [
          { status: "PUBLIC" },
          { status: "DRAFT", userId: user ? user.id : undefined },
        ],
      },
      include: {
        maltArticle: true,
        user: true,
        recipeComment: {
          include: { user: true },
        },
      },
    });

    // 記事が見つからない場合
    if (!recipeArticle) {
      return NextResponse.json(
        { message: "レシピが存在しません" },
        { status: 400 }
      );
    }

    // 認証されていないユーザーへの対応
    if (!data.user) {
      return NextResponse.json<IndexResponse>(
        {
          recipeArticle,
          maltTitle: recipeArticle.maltArticle.title,
          postedName: recipeArticle.user.name,
          comments: recipeArticle.recipeComment.map(comment => ({
            id: comment.id,
            content: comment.content,
            createdDate: comment.createdAt,
            userName: comment.user.name,
            userId: comment.userId,
          })),
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
      {
        recipeArticle,
        maltTitle: recipeArticle.maltArticle.title,
        postedName: recipeArticle.user.name,
        comments: recipeArticle.recipeComment.map(comment => ({
          id: comment.id,
          content: comment.content,
          createdDate: comment.createdAt,
          userName: comment.user.name,
          userId: comment.userId,
        })),
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
    const { material, status, tips, title, imageUrl }: PutRequest =
      await request.json();
    await prisma.recipeArticle.update({
      where: { id },
      data: {
        material,
        status,
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
