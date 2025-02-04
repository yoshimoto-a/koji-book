import { RecipeArticle } from "@prisma/client";

export type IndexResponse = {
  recipeArticle: RecipeArticle;
  maltTitle: string;
  postedName: string;
  liked: boolean;
  saved: boolean;
};
