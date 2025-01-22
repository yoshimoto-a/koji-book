import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "../_utils/buildError";
import { PostRequest } from "@/app/_types/Register/PostRequest";
export const POST = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  const { name, supabaseUserId }: PostRequest = await request.json();

  try {
    await prisma.user.create({
      data: {
        role: "MEMBER",
        name,
        supabaseUserId,
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
