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
    if (!session) alert("レシピの保存はログインすると使える機能です。");
    try {
      console.log(`/api/${cleanedPath}/${articleId}/save`);
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
        <div>
          <p>レシピの保存はログインすると使える機能です。</p>
          <p>
            ユーザー登録がまだの方は
            <div
              onClick={() => push("/signup")}
              className="bg-dark_brown text-white"
            >
              こちら
            </div>
            から登録してください。
          </p>
          <p>
            ログインは
            <div
              onClick={() => push("/login")}
              className="bg-dark_brown text-white"
            >
              こちら
            </div>
            です。
          </p>
        </div>
      </Modal>
    </div>
  );
};
