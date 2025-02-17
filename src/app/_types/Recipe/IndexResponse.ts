import { RecipeArticle } from "@prisma/client";

export type Comment = {
  id: string;
  content: string;
  createdDate: Date;
  userId: string;
  userName: string;
};
export type IndexResponse = {
  recipeArticle: RecipeArticle;
  maltTitle: string;
  postedName: string;
  comments: Comment[];
  liked: boolean;
  saved: boolean;
};
