import { PutRequest } from "@/app/_types/Status/Malt/PutRequest";
import { buildPrisma } from "@/app/_utils/prisma";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
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
    const { nextStatus }: PutRequest = await request.json();
    await prisma.maltArticle.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        status: nextStatus,
      },
    });

    return NextResponse.json({ message: "success!" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
