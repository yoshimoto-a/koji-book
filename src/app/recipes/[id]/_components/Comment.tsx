import { Comment as CommentType } from "@/app/_types/Recipe/IndexResponse";
import dayjs from "dayjs";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useCommentActions } from "../_hooks/useCommentActions";
import { Reply } from "./Reply";
interface Props {
  comment: CommentType;
}
export const Comment: React.FC<Props> = ({ comment }) => {
  const { session } = useSupabaseSession();
  const [replyMode, setReplyMode] = useState(false);

  const {
    editMode,
    setEditMode,
    handleEdit,
    handleDelete,
    isOwnComment,
    setEditedComment,
    isSubmitting,
    editedComment,
    ref,
  } = useCommentActions({ comment });

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
                <button type="button" className="" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
            {dayjs(comment.createdDate).format("YYYY/M/D")}
          </div>
        </div>
        {editMode ? (
          <form ref={ref} onSubmit={handleEdit} className="relative w-full">
            <textarea
              value={editedComment}
              disabled={isSubmitting}
              onChange={e => setEditedComment(e.target.value)}
              className="w-full border-[1px] block border-dark_brown placeholder:text-dark_brown  rounded-md"
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
        {session && !editMode && (
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
        <Reply
          comment={comment}
          setReplyMode={setReplyMode}
          replyMode={replyMode}
        />
      )}
    </>
  );
};
