"use client";
import { api } from "../_utils/api";
import { usePathname } from "next/navigation";
import { KeyedMutator } from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as likedHaert } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { PostRequest } from "../_types/Likes/PostRequest";
import { motion, AnimatePresence } from "framer-motion";
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
  const [tempLikes, setTempLikes] = useState(0);
  const [displayLikes, setDisplayLikes] = useState(likesCount);
  const cleanedPath = pathName.includes("malts") ? "malts" : "recipes";
  const [hearts, setHearts] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  const fetcher = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const body: PostRequest = { likesCount: tempLikes };
      await api.post(`/api/${cleanedPath}/${articleId}/like`, body);
      mutate();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setTempLikes(0);
    }
  }, [articleId, cleanedPath, mutate, tempLikes]);
  useEffect(() => {
    if (tempLikes === 0) return;

    const timeoutId = setTimeout(fetcher, 500); // 連打が止まって0.5秒後にリクエスト

    return () => clearTimeout(timeoutId);
  }, [fetcher, tempLikes]);

  const onClick = () => {
    if (isSubmitting) return;

    setTempLikes(prev => prev + 1);
    setDisplayLikes(prev => prev + 1);
    // アニメーションを追加
    const id = Date.now();
    const newHearts = [
      {
        id: id,
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        size: Math.random() * 0.5 + 0.8,
      }, // 真上
      {
        id: id + 1,
        x: -30 + Math.random() * 10 - 5,
        y: -20 + Math.random() * 10 - 5,
        size: Math.random() * 0.5 + 0.8,
      }, // 左上
      {
        id: id + 2,
        x: 30 + Math.random() * 10 - 5,
        y: -20 + Math.random() * 10 - 5,
        size: Math.random() * 0.5 + 0.8,
      }, // 右上
    ];
    setHearts(prev => [...prev, ...newHearts]);

    // 1秒後に削除
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== id));
    }, 1000);
  };
  return (
    <div className="flex flex-col items-center relative">
      <button type="button" onClick={onClick} disabled={isSubmitting}>
        <FontAwesomeIcon
          icon={liked ? likedHaert : faHeart}
          className="text-dark_brown text-4xl"
        />
      </button>
      <AnimatePresence>
        {hearts.map(({ id, x, y }) => (
          <motion.div
            key={id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              y: y - 50, // 上に移動
              x: x + (Math.random() * 10 - 5), // 横揺れ
              rotate: Math.random() * 20 - 10, // 回転
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-dark_brown top-[-10px]"
          >
            <FontAwesomeIcon icon={faHeart} className="text-2xl" />
          </motion.div>
        ))}
      </AnimatePresence>

      <div>{displayLikes}</div>
    </div>
  );
};
