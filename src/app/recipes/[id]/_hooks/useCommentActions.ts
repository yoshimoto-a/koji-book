import { useUser } from "@/app/_hooks/useUser";
import { Comment as CommentType } from "@/app/_types/Recipe/IndexResponse";
import { api } from "@/app/_utils/api";
import { useParams } from "next/navigation";
import { useRecipe } from "../_hooks/useRecipe";
import { useState } from "react";
import { PutRequest } from "@/app/_types/Recipe/Comment/PutRequest";
import { useClickOutside } from "@/app/_hooks/useClickOutside";
export const useCommentActions = ({ comment }: { comment: CommentType }) => {
  const { data } = useUser();
  const { id } = useParams();
  const { mutate } = useRecipe({ id: id as string });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const { ref } = useClickOutside<HTMLFormElement>(
    () => setEditMode(false),
    editMode
  );
  const isOwnComment = data?.user && comment.userId === data.user.id;

  const handleDelete = async () => {
    if (!confirm("コメントを削除しますか？")) return;
    try {
      await api.del(`/api/comments/${comment.id}`);
      mutate();
    } catch (e) {
      console.error(e);
      alert("コメントの削除失敗しました");
    }
  };

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const body: PutRequest = {
        comment: editedComment,
      };
      await api.put<PutRequest, { message: string }>(
        `/api/comments/${comment.id}`,
        body
      );
      mutate();
      setEditMode(false); // 編集が終わったら編集モードを終了
    } catch (e) {
      console.error(e);
      alert("コメントの編集に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ref,
    editMode,
    setEditMode,
    handleEdit,
    handleDelete,
    isOwnComment,
    setEditedComment,
    isSubmitting,
    editedComment,
  };
};
