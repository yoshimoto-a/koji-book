import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/Admin/IndexResponse";
export const useAdminMalts = () => {
  return useFetch<IndexResponse>("/api/admin/malts", undefined, true);
};
