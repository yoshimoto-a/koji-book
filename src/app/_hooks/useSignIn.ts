import { supabase } from "../_utils/supabase";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useSignIn = () => {
  const [password] = useLocalStorage<string>("koji-password", "");
  const [email] = useLocalStorage<string>("koji-email", "");
  const { push } = useRouter();

  const signIn = useCallback(async () => {
    if (!email || !password) {
      push("/login");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    toast.success("ログインしました");
    if (error) {
      alert(`ログイン出来ませんでした。${error}`);
      push("login");
    }
  }, [push, email, password]);

  return {
    signIn,
    password,
    email,
  };
};
