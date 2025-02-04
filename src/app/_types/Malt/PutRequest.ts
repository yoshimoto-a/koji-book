import { MaltRole, Status } from "@prisma/client";

export type PutRequest = {
  status: Status;
  maltRole: MaltRole;
  title: string;
  temperature: number;
  time: number;
  material: string;
  tips: string;
  imageUrl: string | null;
};
