"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/Recipes/IndexResponse";
export const useRecipes = ({
  initialValue,
}: {
  initialValue: IndexResponse;
}) => {
  return useFetch(`/api/recipes`, initialValue);
};
