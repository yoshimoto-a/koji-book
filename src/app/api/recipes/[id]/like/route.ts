import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { supabase } from "@/app/_utils/supabase";
import { PostRequest } from "@/app/_types/Likes/PostRequest";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
//認証情報あってもなくても良いけど処理が分かれる
export const POST = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const token = request.headers.get("Authorization") ?? "";

  try {
    const { data } = await supabase.auth.getUser(token);
    const { id } = await params;
    const { likesCount }: PostRequest = await request.json();

    //likesをインクリメント
    await prisma.recipeArticle.update({
      where: {
        id,
      },
      data: {
        likes: {
          increment: likesCount,
        },
      },
    });

    //ログインしてなければreturn
    if (!data.user) {
      return NextResponse.json(
        {
          message: "not login user success!",
        },
        { status: 200 }
      );
    }

    //ログイン中の人で一回目のいいねならuserActionをcreate
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

    const action = await prisma.recipeUserAction.findUnique({
      where: {
        userId_actionType_recipeArticleId: {
          userId: user.id,
          actionType: "LIKE",
          recipeArticleId: id,
        },
      },
    });
    if (action === null) {
      await prisma.recipeUserAction.create({
        data: {
          actionType: "LIKE",
          userId: user.id,
          recipeArticleId: id,
        },
      });
    }

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
