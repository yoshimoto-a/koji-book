"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { RecipesResponse } from "@/app/_types/Mypage/RecipesResponse";
export const useRecipes = () => {
  return useFetch<RecipesResponse>(`/api/user/recipes`, undefined, true);
};
