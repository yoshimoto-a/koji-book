"use client";
import { useAdminMalts } from "./_hooks/useAdminMalts";
import { Table } from "./_components/Table";

export default function Page() {
  const { data, error } = useAdminMalts();
  if (!data) return <div className="text-center pt-20">読込み中...</div>;
  if (error) return <div>エラー が発生しました</div>;

  if (data.maltArticles.length === 0)
    return <div className="text-center pt-10">申請中の投稿はありません</div>;
  return <Table maltData={data.maltArticles} />;
}
