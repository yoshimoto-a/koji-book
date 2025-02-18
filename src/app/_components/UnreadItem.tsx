import Link from "next/link";
import { CommentWithRecipe } from "../_types/Unread/IndexResponse";
import { api } from "../_utils/api";
import { useUnread } from "../_hooks/useUnread";
interface Props {
  contents: CommentWithRecipe;
}
export const UnreadItem: React.FC<Props> = ({ contents }) => {
  const { mutate } = useUnread();
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
    <Link
      href={`/recipes/${contents.article.id}/#comments`}
      onClick={() => isReaded(contents.article.id)}
    >
      <div className="bg-light_beige p-2 rounded-md border border-dark_brown shadow-md hover:bg-dark_brown hover:text-white transition">
        <span className="font-bold">{contents.article.title}</span>
        未読{contents.comments.length}件
        <ul className="mt-1 text-sm text-dark_brown">
          {contents.comments.map(content => (
            <li key={content.id}>
              {content.parentId === null ? "📌 コメント" : "💬 返信"}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};
