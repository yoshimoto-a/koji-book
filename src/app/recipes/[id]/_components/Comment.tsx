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
interface Props {
  comment: CommentType;
}
export const Comment: React.FC<Props> = ({ comment }) => {
  const { data } = useUser();
  const { id } = useParams();
  const { mutate } = useRecipe({ id: id as string });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
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
  return (
    <>
      <div key={comment.id} className="p-2 shadow-sm">
        <div className="flex justify-between">
          <div className="text-[10px] font-bold">{comment.userName}</div>
          <div className="text-[10px]">
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
          <div className="flex justify-between">
            <div className="whitespace-pre-wrap">{comment.content}</div>
            {isOwnComment && (
              <div className="gap-2 flex">
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
          </div>
        )}
      </div>
    </>
  );
};
