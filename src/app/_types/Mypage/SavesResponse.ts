import { MaltArticle, RecipeArticle } from "@prisma/client";
export type RecipeArticleWithMaltTitle = RecipeArticle & {
  maltArticle: MaltArticle;
};

export type SavesResponse = {
  malts: MaltArticle[];
  recipes: RecipeArticleWithMaltTitle[];
};
