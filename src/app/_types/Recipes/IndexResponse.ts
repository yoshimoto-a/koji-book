import { RecipeArticle } from "@prisma/client";
export type RecipeArticleWithActions = {
  article: RecipeArticle;
  malt: string;
  like: boolean;
  save: boolean;
  userName: string;
};
export type IndexResponse = {
  recipeArticles: RecipeArticleWithActions[];
  totalPages: number;
};
