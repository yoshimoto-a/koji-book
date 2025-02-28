import { buildPrisma } from "@/app/_utils/prisma";
import { supabaseAdmin } from "../../_utils/supabaseAdmin";
import process from "process";
import { google } from "googleapis";
import { RecipeArticle } from "@prisma/client";
/**userId:通知したい人(ログインユーザーではないので注意)
 * currentUserName:コメントしたユーザー名
 * article:コメントされた投稿
 * reply:コメントへの返信の場合はtrue
 */
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];
export class GmailService {
  private userId: string;
  private currentUserName: string;
  private article?: RecipeArticle;
  private reply?: boolean;
  constructor(
    userId: string,
    currentUserName: string,
    article: RecipeArticle | undefined = undefined,
    reply: boolean = false
  ) {
    this.userId = userId;
    this.currentUserName = currentUserName;
    this.reply = reply;
    this.article = article;
  }
  public async sendMessage() {
    const email = await this.findEmail();
    const oauth2Client = await this.getOAuth2Client();
    oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: SCOPES,
    });

    //users.message
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const base64EncodedEmail = this.createMessage({
      to: email,
      url: process.env.NEXT_PUBLIC_APP_BASE_URL || "",
    });
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: base64EncodedEmail,
      },
    });
    return res.data;
  }

  private async findEmail() {
    const prisma = await buildPrisma();
    const user = await prisma.user.findUnique({
      where: {
        id: this.userId,
      },
      select: {
        supabaseUserId: true,
      },
    });
    if (!user) throw new Error("ユーザー情報なし");
    //ここで取得したdataから送信先のemailを指定する
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(
      user.supabaseUserId
    );
    if (error) throw new Error("ユーザー情報なし");
    return data.user.email as string;
  }
  private async getOAuth2Client() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/auth/callback/google`
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
    const { token } = await oauth2Client.getAccessToken();
    oauth2Client.setCredentials({ access_token: token });
    return oauth2Client;
  }
  private createMessage({ to, url }: { to: string; url: string }) {
    const subject = this.article
      ? "【麹帳】新着コメントがあります🎵"
      : "申請があります";
    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject).toString(
      "base64"
    )}?=`;
    const content = this.article
      ? `${
          this.reply
            ? `『${this.article.title}』の投稿へのコメントに${this.currentUserName}さんから返信がありました。`
            : `『${this.article.title}』の投稿に${this.currentUserName}さんからコメントがありました。`
        }
    \nログインして確認してください！\n\n${url}`
      : `麹調味料レシピの申請があります`;

    const email = [
      "From: dev.kojibook@gmail.com",
      `To: ${to}`,
      `Subject: ${encodedSubject}`,
      "",
      `${content}`,
    ].join("\n");

    const base64EncodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return base64EncodedEmail;
  }
}
