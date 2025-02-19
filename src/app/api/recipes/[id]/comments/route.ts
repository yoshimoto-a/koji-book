import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
import { PostRequest } from "@/app/_types/Recipe/Comment/PostRequest";
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
      select: { userId: true },
    });

    if (!recipeArticle) {
      return NextResponse.json(
        { error: "Recipe article not found" },
        { status: 404 }
      );
    }
    await prisma.recipeComment.create({
      data: {
        userId: user.id,
        content: comment,
        recipeArticleId: id,
        //自分の投稿へのコメントは既読扱いする
        isRead: user.id === recipeArticle.userId,
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
