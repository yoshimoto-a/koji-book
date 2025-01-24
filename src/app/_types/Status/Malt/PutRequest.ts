import { Status } from "@prisma/client";

type NonPublicStatus = Exclude<Status, "PUBLIC">;
//userはpublicにはできないため除外
export type PutRequest = {
  nextStatus: NonPublicStatus;
};
