/**リフレッシュトークンを取得する際に使用 */

import { google } from "googleapis";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code not found" },
      { status: 400 }
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/auth/callback/google`
  );

  try {
    // 認可コードからトークンを取得
    const { tokens } = await oauth2Client.getToken(code);

    return NextResponse.json({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
  } catch (error) {
    console.error("Error exchanging token:", error);
    return NextResponse.json(
      { error: "Failed to exchange token" },
      { status: 500 }
    );
  }
};
