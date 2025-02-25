import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../_utils/getCurrentUser";
import { PostRequest } from "@/app/_types/PushSubscription/PostRequest";
import { IndexResponse } from "@/app/_types/PushSubscription/IndexResponse";
export const POST = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });

    const pushSubscriptionData = await prisma.pushSubscriptionData.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (pushSubscriptionData) {
      await prisma.pushSubscriptionData.delete({
        where: { id: pushSubscriptionData.id },
      });
    }
    const { endpoint, auth, p256dh }: PostRequest = await request.json();
    await prisma.pushSubscriptionData.create({
      data: {
        userId: user.id,
        endpoint,
        auth,
        p256dh,
      },
    });
    return NextResponse.json({ message: "success!" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};

//フロントエンドでこれ必要・・？
export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const { user } = await getCurrentUser({ request });
    const pushSubscriptionData = await prisma.pushSubscriptionData.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!pushSubscriptionData) {
      return NextResponse.json(
        { error: "data id not found!" },
        { status: 400 }
      );
    }

    const { endpoint, auth, p256dh } = pushSubscriptionData;
    return NextResponse.json<IndexResponse>(
      { endpoint, auth, p256dh },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
