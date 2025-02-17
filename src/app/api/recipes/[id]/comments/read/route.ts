import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export const POST = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    await getCurrentUser({ request });
    const { id } = await params;

    await prisma.recipeComment.updateMany({
      where: {
        recipeArticleId: id,
      },
      data: {
        isRead: true,
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
