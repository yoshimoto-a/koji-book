"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "../_types/Mypage/IndexResponse";
export const useUser = () => {
  return useFetch<IndexResponse>(`/api/user`);
};
