"use client";
import { useAdminMalts } from "../admin/_hooks/useAdminMalts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
export const CurrentlyApplying: React.FC = () => {
  const { data, error } = useAdminMalts();
  if (!data) return <div className="text-center">読込み中...</div>;
  if (error) return <div>エラー が発生しました</div>;

  if (data.maltArticles.length === 0) return null;
  return (
    <div>
      <FontAwesomeIcon icon={faClock} className="mr-2 text-red-500" />
      申請中の投稿が{data.maltArticles.length}件あります。
    </div>
  );
};
