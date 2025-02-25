import {
  User,
  MaltArticle,
  RecipeArticle,
  PushSubscriptionData,
} from "@prisma/client";
export type UserData = {
  user: User & {
    // User型にmaltArticlesを含めた形にする
    maltArticles: MaltArticle[];
    recipeArticles: RecipeArticle[];
    pushSubscription: PushSubscriptionData | null;
  };
  email: string | undefined;
};

export type IndexResponse = { user: null } | UserData;
