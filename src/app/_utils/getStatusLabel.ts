import { Status } from "@prisma/client";
type StatusLabels = "下書き" | "申請中" | "公開";
export const getStatusLabel = (status: Status): StatusLabels => {
  switch (status) {
    case Status.DRAFT:
      return "下書き";
    case Status.PENDING_APPROVAL:
      return "申請中";
    case Status.PUBLIC:
      return "公開";
  }
};
