import { MaltRole, Status } from "@prisma/client";

export type MaltArticle = {
  id: string;
  createdAt: Date;
  title: string;
  maltRole: MaltRole;
  status: Status;
  mainMaltArticle: { id: string | null; name: string | null };
  user: {
    id: string;
    name: string;
  };
};
export type IndexResponse = {
  maltArticles: MaltArticle[];
};
