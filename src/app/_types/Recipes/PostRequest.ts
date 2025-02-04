import { Status } from "@prisma/client";

export type PostRequest = {
  status: Status;
  title: string;
  material: string;
  tips: string;
  maltArticleId: string;
  imageUrl: string | null;
};
