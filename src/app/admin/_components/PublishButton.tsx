import { useUpdateStatus } from "../_hooks/useUpdateStatus";
import { MaltArticle } from "@/app/_types/Admin/IndexResponse";
import { MaltRole } from "@prisma/client";
interface Props {
  article: MaltArticle;
  label: string;
}
export const PublishButton: React.FC<Props> = ({ article, label }) => {
  const { updateStatus } = useUpdateStatus({ articleId: article.id });
  const { maltRole, mainMaltArticle } = article;
  const shouldShowButton = !(
    maltRole === MaltRole.SUB && mainMaltArticle.id === null
  );
  return (
    <div className="flex gap-5 items-center">
      <span>{label}</span>
      {shouldShowButton && (
        <button
          type="button"
          onClick={updateStatus}
          className="bg-dark_brown text-white px-3 py-2 rounded-md"
        >
          公開
        </button>
      )}
    </div>
  );
};
