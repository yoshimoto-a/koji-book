import { User, UserAction, MaltArticle, RecipeArticle } from "@prisma/client";
export type IndexResponse = {
  user: User;
  maltArticles: MaltArticle[];
  recipeArticles: RecipeArticle[];
  save: {
    malt: UserAction[];
    recipe: UserAction[];
  };
};
