"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/Recipe/IndexResponse";
export const useRecipe = ({
  initialValue,
  id,
}: {
  initialValue: IndexResponse;
  id: string;
}) => {
  return useFetch(`/api/recipes/${id}`, initialValue);
};
