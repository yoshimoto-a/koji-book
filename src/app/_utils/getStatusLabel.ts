import { Status } from "@prisma/client";
type StatusLabels = "下書き" | "申請中" | "公開";
export const getStatusLabel = (status: Status): StatusLabels => {
  switch (status) {
    case "DRAFT":
      return "下書き";
    case "PENDING_APPROVAL":
      return "申請中";
    case "PUBLIC":
      return "公開";
  }
};
