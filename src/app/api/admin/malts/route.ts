import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "../../_utils/buildError";
import { getCurrentUser } from "../../_utils/getCurrentUser";
import { IndexResponse } from "@/app/_types/Admin/IndexResponse";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });
    if (user.role !== "ADMIN") {
      throw new Error("権限がありません");
    }
    const maltArticles = await prisma.maltArticle.findMany({
      where: { status: "PENDING_APPROVAL" },
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        malt_articles: true,
      },
    });

    return NextResponse.json<IndexResponse>(
      {
        maltArticles: maltArticles.map(article => ({
          id: article.id,
          createdAt: article.createdAt,
          mainMaltArticle: {
            id: article.mainMaltArticleId,
            name: article.malt_articles?.title || null,
          },
          maltRole: article.maltRole,
          status: article.status,
          title: article.title,
          user: { id: article.user.id, name: article.user.name },
        })),
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
