import { RecipeArticle } from "@prisma/client";
export type RecipeArticleWithActions = {
  article: RecipeArticle;
  malt: string;
  like: boolean;
  save: boolean;
};
export type IndexResponse = {
  recipeArticles: RecipeArticleWithActions[];
};
