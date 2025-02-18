import { RecipeArticle } from "@prisma/client";

export type Comment = {
  id: string;
  content: string;
  createdDate: Date;
  userId: string;
  userName: string;
  parentComment: {
    id: string | null;
    content: string | null;
    userId: string | null;
    userName: string | null;
  };
};
export type IndexResponse = {
  recipeArticle: RecipeArticle;
  maltTitle: string;
  postedName: string;
  comments: Comment[];
  liked: boolean;
  saved: boolean;
};
