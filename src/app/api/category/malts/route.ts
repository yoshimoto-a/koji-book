import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "../../_utils/buildError";
import { getCurrentUser } from "../../_utils/getCurrentUser";
import { IndexResponse } from "@/app/_types/Categories/IndexResponse";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    await getCurrentUser({ request });
    const maltArticles = await prisma.maltArticle.findMany({
      where: { status: "PUBLIC", maltRole: "MAIN" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json<IndexResponse>(
      {
        maltArticles,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
