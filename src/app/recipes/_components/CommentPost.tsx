import { useState } from "react";
import { api } from "@/app/_utils/api";
import { PostRequest } from "@/app/_types/Recipe/Comment/PostRequest";
import { useParams } from "next/navigation";
import { useRecipe } from "../[id]/_hooks/useRecipe";
export const CommentPost: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { mutate } = useRecipe({ id: id as string });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment) return;
    setIsSubmitting(true);
    try {
      const body: PostRequest = {
        comment,
      };
      setComment("送信中...");
      await api.post<PostRequest, { meessage: string }>(
        `/api/recipes/${id}/comments`,
        body
      );
      mutate();
      setComment("");
    } catch (e) {
      console.error(e);
      alert("コメントに失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <textarea
          value={comment}
          disabled={isSubmitting}
          onChange={e => setComment(e.target.value)}
          className="w-full border-[1px]"
          placeholder="コメントを入力"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            !comment && "hidden"
          } absolute right-1 bottom-2 px-1 bg-dark_brown text-white rounded-sm`}
        >
          送信
        </button>
      </div>
    </form>
  );
};
