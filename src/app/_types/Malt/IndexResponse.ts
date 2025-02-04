import { MaltArticle, RecipeArticle } from "@prisma/client";
export type IndexResponse = {
  maltArticle: MaltArticle;
  recipeArticles: RecipeArticle[];
  postedName: string;
  liked: boolean;
  saved: boolean;
};
