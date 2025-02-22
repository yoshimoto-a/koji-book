import { Status } from "@prisma/client";

export type PutRequest = {
  status: Status;
};
