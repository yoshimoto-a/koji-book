import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
import { PutRequest } from "@/app/_types/Admin/malts/Role/PutRequest";
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
    const { maltRole }: PutRequest = await request.json();
    await prisma.maltArticle.update({
      where: {
        id,
      },
      data: {
        maltRole,
        ...(maltRole === "MAIN" && { mainMaltArticleId: null }),
      },
    });

    return NextResponse.json({ message: "success!" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
