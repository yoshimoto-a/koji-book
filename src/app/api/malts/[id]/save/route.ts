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
    const { id } = await params;
    const user = await getCurrentUser({ request });

    const action = await prisma.maltUserAction.findUnique({
      where: {
        userId_actionType_maltArticleId: {
          userId: user.id,
          actionType: "SAVE",
          maltArticleId: id,
        },
      },
    });

    //既に保存された場合はmaltUserAction消してデクリメント
    if (action) {
      await prisma.maltUserAction.delete({
        where: {
          id: action.id,
        },
      });
      await prisma.maltArticle.update({
        where: {
          id,
        },
        data: {
          saves: {
            decrement: 1,
          },
        },
      });
      return NextResponse.json(
        {
          message: "delete success!",
        },
        { status: 200 }
      );
    }

    await prisma.maltUserAction.create({
      data: {
        actionType: "SAVE",
        userId: user.id,
        maltArticleId: id,
      },
    });

    //savesをインクリメント
    await prisma.maltArticle.update({
      where: {
        id,
      },
      data: {
        saves: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      {
        message: "success!",
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
