"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { SavesResponse } from "@/app/_types/Mypage/SavesResponse";
export const useSaves = () => {
  return useFetch<SavesResponse>(`/api/user/saves`, undefined, true);
};
