"use client";
import { api } from "../_utils/api";
import { usePathname } from "next/navigation";
import { KeyedMutator } from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as likedHaert } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
interface Props<T> {
  liked: boolean;
  likesCount: number;
  articleId: string;
  mutate: KeyedMutator<T>;
}
export const Like = <T,>({
  liked,
  likesCount,
  articleId,
  mutate,
}: Props<T>) => {
  const pathName = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cleanedPath = pathName.includes("malts") ? "malts" : "recipes";
  const onClick = async () => {
    try {
      setIsSubmitting(true);
      await api.post(`/api/${cleanedPath}/${articleId}/like`, {});
      mutate();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <button type="button" onClick={onClick} disabled={isSubmitting}>
        <FontAwesomeIcon
          icon={liked ? likedHaert : faHeart}
          className="text-dark_brown text-4xl"
        />
      </button>
      <div>{likesCount}</div>
    </div>
  );
};
