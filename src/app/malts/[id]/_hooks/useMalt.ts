"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/Malt/IndexResponse";
export const useMalt = ({
  initialValue,
  id,
}: {
  initialValue: IndexResponse;
  id: string;
}) => {
  return useFetch(`/api/malts/${id}`, initialValue);
};
