import { useUser } from "@/app/_hooks/useUser";
import { Comment as CommentType } from "@/app/_types/Recipe/IndexResponse";
import dayjs from "dayjs";
import { api } from "@/app/_utils/api";
import { useParams } from "next/navigation";
import { useRecipe } from "../_hooks/useRecipe";
import { useEffect, useRef, useState } from "react";
import { PutRequest } from "@/app/_types/Recipe/Comment/PutRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PostRequest } from "@/app/_types/Recipe/Comment/Reply/PostRequest";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
interface Props {
  comment: CommentType;
}
export const Comment: React.FC<Props> = ({ comment }) => {
  const { data } = useUser();
  const { id } = useParams();
  const { session } = useSupabaseSession();
  const { mutate } = useRecipe({ id: id as string });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [replyContent, setReplyContent] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const isOwnComment = data?.user && comment.userId === data.user.id;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setEditMode(false);
      }
    };

    if (editMode) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editMode]);
  const hadleDelete = async () => {
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

  //返信コメント
  const handleReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const body: PostRequest = {
        comment: replyContent,
      };
      await api.post(`/api/recipes/${id}/comments/${comment.id}`, body);
      setReplyContent("");
      mutate();
    } catch (e) {
      console.error(e);
      alert("返信に失敗しました");
    } finally {
      setReplyMode(false);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div key={comment.id} className="p-2 shadow-sm" id={comment.id}>
        <div className="flex justify-between">
          <div className="text-[10px] font-bold">{comment.userName}</div>
          <div className="text-[10px]">
            {isOwnComment && (
              <div className="gap-2 flex justify-end">
                <button
                  type="button"
                  className=""
                  onClick={() => setEditMode(true)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button type="button" className="" onClick={hadleDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
            {dayjs(comment.createdDate).format("YYYY/M/D")}
          </div>
        </div>
        {editMode ? (
          <form ref={formRef} onSubmit={handleEdit} className="relative w-full">
            <textarea
              value={editedComment}
              disabled={isSubmitting}
              onChange={e => setEditedComment(e.target.value)}
              className="w-full border-[1px] block"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-1 bottom-2 px-1 bg-dark_brown text-white rounded-sm"
            >
              送信
            </button>
          </form>
        ) : (
          <div className="flex justify-between flex-col">
            {comment.parentComment.id && (
              <p className="text-xs text-gray-400">
                <span className="font-bold text-sm">
                  {comment.parentComment.userName}
                </span>
                さんへの返信
                <span className="text-sm line-clamp-2">
                  {comment.parentComment.content}
                </span>
              </p>
            )}
            <div className="whitespace-pre-wrap">{comment.content}</div>
          </div>
        )}
        {session && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setReplyMode(true)}
              className=" px-1 bg-dark_brown text-white rounded-sm"
            >
              返信
            </button>
          </div>
        )}
      </div>
      {replyMode && (
        <form onSubmit={handleReply} className="mt-2">
          <textarea
            value={replyContent}
            onChange={e => setReplyContent(e.target.value)}
            placeholder="返信を書く..."
            className="w-full border-[1px] block"
          />
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 px-2 bg-dark_brown text-white rounded-sm"
            >
              送信
            </button>
            <button
              type="button"
              onClick={() => setReplyMode(false)}
              className="mt-2 px-2 bg-dark_brown text-white rounded-sm"
            >
              やめる
            </button>
          </div>
        </form>
      )}
    </>
  );
};
