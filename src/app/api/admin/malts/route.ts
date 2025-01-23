import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "../../_utils/buildError";
import { getCurrentUser } from "../../_utils/getCurrentUser";
import { IndexResponse } from "@/app/_types/Admin/IndexResponse";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const user = await getCurrentUser({ request });
    if (user.role !== "ADMIN") {
      throw new Error("権限がありません");
    }
    const maltArticles = await prisma.maltArticle.findMany({
      where: { status: "PENDING_APPROVAL" },
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
