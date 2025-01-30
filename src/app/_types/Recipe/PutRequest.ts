import { Status } from "@prisma/client";

export type PutRequest = {
  status: Status;
  title: string;
  material: string;
  tips: string;
};
