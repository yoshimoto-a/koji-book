import { MaltArticle, RecipeArticle } from "@prisma/client";
type RecipeArticleWithMalt = RecipeArticle & {
  maltArticle: MaltArticle;
};

export type IndexResponse = {
  maltArticles: MaltArticle[];
  recipeArticles: RecipeArticleWithMalt[];
};
