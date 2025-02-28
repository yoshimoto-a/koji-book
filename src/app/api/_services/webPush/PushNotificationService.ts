import { RecipeArticle } from "@prisma/client";
import { buildPrisma } from "@/app/_utils/prisma";
import webpush from "@/app/_utils/webPushConfig";
/**userId:通知したい人(ログインユーザーではないので注意)
 * currentUserName:コメントしたユーザー名(これログインユーザー)
 * article:コメントされた投稿
 * reply:コメントへの返信の場合はtrue
 */

export class WebPush {
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
  public async sendPushNotification() {
    const message = await this.createMessage();
    try {
      const subscription = await this.getSubscription();
      //push通知登録してないユーザーはreturnする
      if (!subscription)
        return { success: false, error: "プッシュサブスクリプションが未登録" };

      await webpush.sendNotification(
        subscription,
        JSON.stringify({
          title: this.article
            ? "【麹帳】新着コメントがあります🎵"
            : "申請があります",
          body: message,
          icon: "/koji.png",
        })
      );
      return { success: true };
    } catch (error) {
      console.error("Error sending push notification:", error);
      return { success: false, error: "Failed to send notification" };
    }
  }

  private async createMessage() {
    if (!this.article) return `麹調味料レシピの申請があります`;
    return this.reply
      ? `『${this.article.title}』の投稿へのコメントに${this.currentUserName}さんから返信がありました。`
      : `『${this.article.title}』の投稿に${this.currentUserName}さんからコメントがありました。`;
  }

  private async getSubscription() {
    const prisma = await buildPrisma();
    const pushSubscriptionData = await prisma.pushSubscriptionData.findUnique({
      where: {
        userId: this.userId,
      },
    });
    if (!pushSubscriptionData) return null;

    return {
      endpoint: pushSubscriptionData.endpoint,
      keys: {
        auth: pushSubscriptionData.auth,
        p256dh: pushSubscriptionData.p256dh,
      },
    };
  }
}
