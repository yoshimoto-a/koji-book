import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export const useFetch = <T>(apiPath: string, initialValue?: T) => {
  const { token } = useSupabaseSession();
  const fetcher = async <T>(path: string): Promise<T | undefined> => {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}${path}`,
      params
    );
    if (res.status !== 200) {
      throw new Error(
        `${res.status} An error occurred while fetching the data.`
      );
    }
    const data: T = await res.json();
    if (!data) {
      throw new Error("データがありません");
    }
    return data;
  };

  const { data, error, isLoading, mutate } = useSWR<
    T | undefined,
    { message: string }
  >(
    apiPath,
    fetcher,
    initialValue !== undefined ? { fallbackData: initialValue } : undefined
  );

  return { data, error, isLoading, mutate };
};
