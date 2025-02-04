import { MaltArticle, RecipeArticle } from "@prisma/client";
export type RecipeArticleWithMalt = RecipeArticle & {
  maltArticle: MaltArticle;
};

export type IndexResponse = {
  maltArticles: MaltArticle[];
  recipeArticles: RecipeArticleWithMalt[];
};
