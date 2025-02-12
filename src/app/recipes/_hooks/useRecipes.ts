"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/Recipes/IndexResponse";
export const useRecipes = ({
  initialValue,
  currentPage = 1,
  searchKeyword = "",
}: {
  initialValue: IndexResponse;
  currentPage?: number;
  searchKeyword?: string;
}) => {
  return useFetch(
    `/api/recipes?page=${currentPage}&keyword=${searchKeyword}`,
    initialValue
  );
};
