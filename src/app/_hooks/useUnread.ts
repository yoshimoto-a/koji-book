"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "../_types/Unread/IndexResponse";
export const useUnread = () => {
  return useFetch<IndexResponse>(`/api/comments/unread`);
};
