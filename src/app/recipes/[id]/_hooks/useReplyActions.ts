import { Comment as CommentType } from "@/app/_types/Recipe/IndexResponse";
import { api } from "@/app/_utils/api";
import { useParams } from "next/navigation";
import { useRecipe } from "../_hooks/useRecipe";
import { useState } from "react";
import { PostRequest } from "@/app/_types/Recipe/Comment/Reply/PostRequest";
export const useReplyActions = ({ comment }: { comment: CommentType }) => {
  const { id } = useParams();
  const { mutate } = useRecipe({ id: id as string });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  //返信コメント
  const handleReply = async () => {
    setIsSubmitting(true);
    try {
      const body: PostRequest = {
        comment: replyContent,
      };
      setReplyContent("送信中");
      await api.post(`/api/recipes/${id}/comments/${comment.id}`, body);
      mutate();
    } catch (e) {
      console.error(e);
      alert("返信に失敗しました");
    } finally {
      setReplyContent("");
      setIsSubmitting(false);
    }
  };
  return {
    handleReply,
    replyContent,
    setReplyContent,
    isSubmitting,
  };
};
