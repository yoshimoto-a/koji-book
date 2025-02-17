import { RecipeComment, RecipeArticle } from "@prisma/client";
export type CommentWithRecipe = {
  article: RecipeArticle;
  comments: RecipeComment[];
};

export type IndexResponse = {
  article: CommentWithRecipe[];
  totalCount: number;
};
