import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { supabase } from "@/app/_utils/supabase";
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
    //likesをインクリメント
    await prisma.maltArticle.update({
      where: {
        id,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    //ログインしてなければreturn
    if (!data.user) {
      return NextResponse.json(
        {
          message: "success!",
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

    const action = await prisma.maltUserAction.findUnique({
      where: {
        userId_actionType_maltArticleId: {
          userId: user.id,
          actionType: "LIKE",
          maltArticleId: id,
        },
      },
    });
    if (action === null) {
      await prisma.maltUserAction.create({
        data: {
          actionType: "LIKE",
          userId: user.id,
          maltArticleId: id,
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
