import { MaltRole, Status } from "@prisma/client";

export type PostRequest = {
  status: Status;
  maltRole: MaltRole;
  title: string;
  temperature: number;
  time: number;
  material: string;
  tips: string;
};
