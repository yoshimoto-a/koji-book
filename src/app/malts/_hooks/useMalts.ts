"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/Malts/IndexResponse";
export const useMalts = ({ initialValue }: { initialValue: IndexResponse }) => {
  return useFetch(`/api/malts`, initialValue);
};
