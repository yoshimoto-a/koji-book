import { User, MaltArticle, RecipeArticle } from "@prisma/client";
export type UserData = {
  user: User & {
    // User型にmaltArticlesを含めた形にする
    maltArticles: MaltArticle[];
    recipeArticles: RecipeArticle[];
  };
  email: string | undefined;
};

export type IndexResponse = { user: null } | UserData;
