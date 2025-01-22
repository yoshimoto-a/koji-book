import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "../_utils/buildError";
import { PostRequest } from "@/app/_types/Malts/PostRequest";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { IndexResponse } from "@/app/_types/Malts/IndexResponse";
export const POST = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  const {
    maltRole,
    material,
    status,
    temperature,
    time,
    tips,
    title,
  }: PostRequest = await request.json();

  try {
    const user = await getCurrentUser({ request });

    await prisma.maltArticle.create({
      data: {
        userId: user.id,
        maltRole,
        material,
        status,
        temperature,
        time,
        tips,
        title,
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

export const GET = async () => {
  const prisma = await buildPrisma();
  try {
    const maltArticles = await prisma.maltArticle.findMany({
      where: { status: "PUBLIC" },
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
