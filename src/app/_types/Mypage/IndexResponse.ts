import {
  User,
  MaltUserAction,
  RecipeUserAction,
  MaltArticle,
  RecipeArticle,
} from "@prisma/client";
export type IndexResponse = {
  user: User;
  maltArticles: MaltArticle[];
  recipeArticles: RecipeArticle[];
  saves: {
    malts: MaltUserAction[];
    recipes: RecipeUserAction[];
  };
};
