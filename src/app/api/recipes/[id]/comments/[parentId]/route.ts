import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
import { PostRequest } from "@/app/_types/Recipe/Comment/Reply/PostRequest";
import { GmailService } from "@/app/api/_cervices/google/GmailService";
interface Props {
  params: Promise<{
    id: string;
    parentId: string;
  }>;
}
export const POST = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });
    const { id, parentId } = await params;
    const { comment }: PostRequest = await request.json();

    const parentComment = await prisma.recipeComment.findUnique({
      where: { id: parentId },
      include: {
        recipeArticle: true,
      },
    });

    if (!parentComment) {
      return NextResponse.json(
        { error: "parent comment not found" },
        { status: 404 }
      );
    }
    await prisma.recipeComment.create({
      data: {
        userId: user.id,
        content: comment,
        recipeArticleId: id,
        parentId,
      },
    });

    //親が自分ならreturn
    if (parentComment.userId == user.id)
      return NextResponse.json(
        {
          message: "success!",
        },
        { status: 200 }
      );
    const gmail = new GmailService(
      parentComment.userId,
      user.name,
      parentComment.recipeArticle,
      true
    );
    await gmail.sendMessage();

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
