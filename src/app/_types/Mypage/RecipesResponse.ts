import { Status } from "@prisma/client";

type recipe = {
  id: string;
  title: string;
  maltTitle: string;
  status: Status;
};
export type RecipesResponse = {
  recipeArticles: recipe[];
};
