"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { MaltsResponse } from "@/app/_types/Mypage/MaltsResponse";
export const useMalts = () => {
  return useFetch<MaltsResponse>(`/api/user/malts`, undefined, true);
};
