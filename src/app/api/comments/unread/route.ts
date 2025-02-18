import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../_utils/getCurrentUser";
import { IndexResponse } from "@/app/_types/Unread/IndexResponse";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });
    const unreadComments = await prisma.recipeComment.findMany({
      where: {
        OR: [
          {
            recipeArticle: {
              userId: user.id,
            },
            parentId: null,
          },
          { parentComment: { userId: user.id }, NOT: { parentId: null } },
        ],
        isRead: false,
      },
      include: {
        recipeArticle: true,
        parentComment: true,
      },
    });

    const articleMap = new Map();
    unreadComments.forEach(comment => {
      const articleId = comment.recipeArticle.id;
      if (!articleMap.has(articleId)) {
        articleMap.set(articleId, {
          article: comment.recipeArticle,
          comments: [],
        });
      }
      articleMap.get(articleId).comments.push(comment);
    });

    return NextResponse.json<IndexResponse>(
      {
        article: Array.from(articleMap.values()),
        totalCount: unreadComments.length,
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
