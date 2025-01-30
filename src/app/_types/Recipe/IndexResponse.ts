import { RecipeArticle } from "@prisma/client";

export type IndexResponse = {
  recipeArticle: RecipeArticle;
  liked: boolean;
  saved: boolean;
};
