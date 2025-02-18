import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
import { PostRequest } from "@/app/_types/Recipe/Comment/Reply/PostRequest";
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
      select: { userId: true },
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
        //自分のコメントへの返信は既読扱いする
        isRead: user.id === parentComment.userId,
      },
    });
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
