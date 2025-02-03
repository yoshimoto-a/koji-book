import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { MaltsResponse } from "@/app/_types/Mypage/MaltsResponse";
import { getCurrentUser } from "../../_utils/getCurrentUser";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });

    const maltArticles = await prisma.maltArticle.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json<MaltsResponse>(
      {
        maltArticles,
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
