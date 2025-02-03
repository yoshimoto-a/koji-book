import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IndexResponse } from "@/app/_types/Mypage/IndexResponse";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { PutRequest } from "@/app/_types/Mypage/PutRequest";

export const GET = async (request: NextRequest) => {
  try {
    const token = request.headers.get("Authorization");
    if (!token) {
      return NextResponse.json<IndexResponse>(
        {
          user: null,
        },
        { status: 200 }
      );
    }
    const { user, email } = await getCurrentUser({ request });

    return NextResponse.json<IndexResponse>(
      {
        user,
        email,
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};

export const PUT = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });
    const { name }: PutRequest = await request.json();
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
      },
    });
    return NextResponse.json({ message: "success!" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
