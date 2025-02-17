import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
import { PutRequest } from "@/app/_types/Recipe/Comment/PutRequest";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const PUT = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });
    const { id } = await params;
    const { comment }: PutRequest = await request.json();
    await prisma.recipeComment.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        content: comment,
      },
    });
    return NextResponse.json(
      {
        message: "success!",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return buildError(e);
  }
};

export const DELETE = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });

    const { id } = await params;
    console.log(id);
    await prisma.recipeComment.delete({
      where: {
        id,
        userId: user.id,
      },
    });
    return NextResponse.json(
      {
        message: "success!",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return buildError(e);
  }
};
