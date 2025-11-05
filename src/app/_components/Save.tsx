"use client";
import { api } from "../_utils/api";
import { KeyedMutator } from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as savedBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { Modal } from "./Modal";
import { useState } from "react";
import { Button } from "./Button";
interface Props<T> {
  saved: boolean;
  savesCount: number;
  articleId: string;
  mutate: KeyedMutator<T>;
}
export const Save = <T,>({
  saved,
  savesCount,
  articleId,
  mutate,
}: Props<T>) => {
  const { session } = useSupabaseSession();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { push } = useRouter();
  const cleanedPath = pathName.includes("malts") ? "malts" : "recipes";

  const onClick = async () => {
    if (!session) {
      setIsOpen(true);
      return;
    }
    try {
      await api.post(`/api/${cleanedPath}/${articleId}/save`, {});
      mutate();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <button type="button" onClick={onClick}>
        <FontAwesomeIcon
          icon={saved ? savedBookmark : faBookmark}
          className="text-dark_brown text-4xl"
        />
      </button>
      <div>{savesCount}</div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white py-10 px-3 rounded-md flex flex-col gap-5">
          <p className="text-xl">
            レシピの保存はログインすると使える機能です。
          </p>
          <p>まだの方はユーザー登録をお願いします。</p>
          <Button
            type="button"
            onClick={() => push("/signup")}
            className="bg-dark_brown text-white"
          >
            ユーザー登録
          </Button>

          <p>ログインは下のボタンからお願いします。 </p>
          <Button
            type="button"
            onClick={() => push("/login")}
            className="bg-dark_brown text-white"
          >
            ログインする
          </Button>
        </div>
      </Modal>
    </div>
  );
};
