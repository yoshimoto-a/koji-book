import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUnread } from "../_hooks/useUnread";
import { Modal } from "./Modal";
import { useState } from "react";
import { UnreadItem } from "./UnreadItem";
export const Unread: React.FC = () => {
  const { data } = useUnread();
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="absolute top-[-2px] right-[-2px] text-[10px] border-red-600 border-[1px] rounded-full w-4 h-4 text-red-600 font-bold">
            {data.totalCount}
          </div>
        )}
        <div className="text-xs">コメント</div>
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white w-3/4 h-2/3 py-2 px-3 rounded-md">
          <h2 className="pb-5 text-center">投稿へのコメント</h2>
          {!data ? (
            <div className="text-sm text-center">読込み中...</div>
          ) : data.totalCount === 0 ? (
            <div className="text-sm text-center">
              未読のコメントはありません
            </div>
          ) : (
            <div className=" flex flex-col gap-2">
              {data.article.map(comment => (
                <UnreadItem key={comment.article.id} contents={comment} />
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
