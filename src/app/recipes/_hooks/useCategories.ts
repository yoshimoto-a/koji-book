"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/Categories/IndexResponse";
export const useCategories = () => {
  return useFetch<IndexResponse>(`/api/category/malts`);
};
