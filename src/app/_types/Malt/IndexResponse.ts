import { MaltArticle, RecipeArticle } from "@prisma/client";
export type IndexResponse = {
  MaltArticle: MaltArticle;
  RecipeArticles: RecipeArticle[];
  liked: boolean;
  saved: boolean;
};
