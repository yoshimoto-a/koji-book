import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUnread } from "../_hooks/useUnread";
import { Modal } from "./Modal";
import { useState } from "react";
import Link from "next/link";
import { api } from "../_utils/api";
export const Unread: React.FC = () => {
  const { data, mutate } = useUnread();
  const [isOpen, setIsOpen] = useState(false);

  const isReaded = async (recipeId: string) => {
    try {
      await api.post(`/api/recipes/${recipeId}/comments/read`, {});
      mutate();
    } catch (e) {
      console.error(e);
      alert("既読にできなかった");
    }
  };
  return (
    <>
      <button
        type="button"
        className="flex flex-col gap-1 items-center relative"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon
          icon={faBell}
          className="text-dark_brown text-2xl mt-1"
        />
        {data && data.totalCount !== 0 && (
          <div className="absolute top-[-2px] right-[-8px] text-[10px] bg-light_beige">
            {data.totalCount}
          </div>
        )}
        <div className="text-xs">コメント</div>
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white w-3/4 h-2/3 py-2 px-3">
          <h2 className="pb-5 text-center">投稿へのコメント</h2>
          {data?.totalCount === 0 ? (
            <div>未読のコメントはありません</div>
          ) : (
            <div className=" flex flex-col gap-2">
              {data?.article.map(comment => (
                <Link
                  key={comment.article.id}
                  href={`/recipes/${comment.article.id}`}
                  onClick={() => isReaded(comment.article.id)}
                >
                  <div className="bg-light_beige p-2 rounded-md border border-dark_brown shadow-md hover:bg-dark_brown hover:text-white transition">
                    <span className="font-bold">{comment.article.title}</span>
                    に未読のコメントが
                    {comment.comments.length}件
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
