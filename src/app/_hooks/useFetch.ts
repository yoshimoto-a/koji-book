import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useEffect } from "react";

/**requiresAuth　publicなページ以外はtrueにする(条件付きfetchする)
 * initialValue　SSR取得後にログイン中ならデータ更新する場合設定したい値を渡す
 */
export const useFetch = <T>(
  apiPath: string,
  initialValue?: T,
  requiresAuth: boolean = false
) => {
  const { token } = useSupabaseSession();
  const fetcher = async <T>(path: string): Promise<T | undefined> => {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
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
    !requiresAuth || token ? apiPath : null,
    fetcher,
    initialValue !== undefined ? { fallbackData: initialValue } : undefined
  );
  useEffect(() => {
    mutate();
  }, [token, mutate]);

  return { data, error, isLoading, mutate };
};
