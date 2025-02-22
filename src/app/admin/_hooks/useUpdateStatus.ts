import { PutRequest } from "@/app/_types/Admin/malts/status/PutRequest";
import { useAdminMalts } from "./useAdminMalts";
import { api } from "@/app/_utils/api";
export const useUpdateStatus = ({ articleId }: { articleId: string }) => {
  const { mutate } = useAdminMalts();
  const updateStatus = async () => {
    if (!confirm("公開しますか？")) return;
    try {
      await api.put<PutRequest, { message: string }>(
        `/api/admin/malts/${articleId}/status`,
        { status: "PUBLIC" }
      );
      mutate();
    } catch (e) {
      console.error(e);
      alert(e);
    }
  };

  return { updateStatus };
};
