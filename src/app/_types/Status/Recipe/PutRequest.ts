import { Status } from "@prisma/client";

export type PutRequest = {
  nextStatus: Status;
};
