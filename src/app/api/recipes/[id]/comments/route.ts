import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
import { PostRequest } from "@/app/_types/Recipe/Comment/PostRequest";
import { GmailService } from "@/app/api/_services/google/GmailService";
import { WebPush } from "@/app/api/_services/webPush/PushNotificationService";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export const POST = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });
    const { id } = await params;
    const { comment }: PostRequest = await request.json();
    const recipeArticle = await prisma.recipeArticle.findUnique({
      where: { id },
    });

    if (!recipeArticle) {
      return NextResponse.json(
        { error: "Recipe article not found" },
        { status: 404 }
      );
    }
    const isOwnArticle = user.id === recipeArticle.userId;
    await prisma.recipeComment.create({
      data: {
        userId: user.id,
        content: comment,
        recipeArticleId: id,
        //自分の投稿へのコメントは既読扱いする
        isRead: isOwnArticle,
      },
    });

    //自分の投稿じゃなければ
    if (!isOwnArticle) {
      //メール送信する
      const gmail = new GmailService(
        recipeArticle.userId,
        user.name,
        recipeArticle
      );
      await gmail.sendMessage();
      //プッシュ通知する
      const webPush = new WebPush(
        recipeArticle.userId,
        user.name,
        recipeArticle
      );

      await webPush.sendPushNotification();
    }

    return NextResponse.json(
      {
        message: "success!",
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return buildError(e);
  }
};
