import { NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "../_utils/buildError";
import { IndexResponse } from "@/app/_types/TopPage/IndexResponse";

export const GET = async () => {
  const prisma = await buildPrisma();
  try {
    const maltArticles = await prisma.maltArticle.findMany({
      where: { status: "PUBLIC" },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
    const recipeArticles = await prisma.recipeArticle.findMany({
      where: { status: "PUBLIC" },
      include: {
        maltArticle: true,
      },
      orderBy: { createdAt: "desc" },
      take: 4,
    });

    return NextResponse.json<IndexResponse>(
      {
        maltArticles,
        recipeArticles,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
