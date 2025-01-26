import { MaltArticle } from "@prisma/client";
export type MaltArticleWithActions = {
  article: MaltArticle;
  like: boolean;
  save: boolean;
};

export type IndexResponse = {
  maltArticles: MaltArticleWithActions[];
};
