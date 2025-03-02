import { Comment as CommentType } from "@/app/_types/Recipe/IndexResponse";
import { useReplyActions } from "../_hooks/useReplyActions";
import { useClickOutside } from "@/app/_hooks/useClickOutside";
interface Props {
  comment: CommentType;
  setReplyMode: (replyMode: boolean) => void;
  replyMode: boolean;
}
export const Reply: React.FC<Props> = ({
  comment,
  setReplyMode,
  replyMode,
}) => {
  const { handleReply, replyContent, setReplyContent, isSubmitting } =
    useReplyActions({ comment });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleReply();
    setReplyMode(false);
  };
  const { ref } = useClickOutside<HTMLFormElement>(
    () => setReplyMode(false),
    replyMode
  );
  return (
    <form ref={ref} onSubmit={handleSubmit} className="mt-2">
      <textarea
        value={replyContent}
        onChange={e => setReplyContent(e.target.value)}
        placeholder="返信を書く..."
        className="pl-2 w-full border-[1px] block border-dark_brown placeholder:text-dark_brown  rounded-md"
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
  );
};
