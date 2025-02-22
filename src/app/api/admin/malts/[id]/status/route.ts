import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
import { PutRequest } from "@/app/_types/Admin/malts/Status/PutRequest";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export const PUT = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });
    if (user.role !== "ADMIN") {
      throw new Error("権限がありません");
    }
    const { id } = await params;
    const { status }: PutRequest = await request.json();
    const maltArticle = await prisma.maltArticle.findUnique({
      where: {
        id,
      },
    });
    if (!maltArticle) {
      return NextResponse.json(
        { error: "maltArticle is not found!" },
        { status: 400 }
      );
    }

    if (
      maltArticle.maltRole === "SUB" &&
      maltArticle.mainMaltArticleId === null
    ) {
      return NextResponse.json(
        {
          error:
            "Main malt article is required for a SUB malt role but was not found.",
        },
        { status: 400 }
      );
    }
    await prisma.maltArticle.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({ message: "success!" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
