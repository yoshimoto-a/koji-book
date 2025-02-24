"use client";
import { useUser } from "../_hooks/useUser";
import { CurrentlyApplying } from "./CurrentlyApplying";
export const AdminArea: React.FC = () => {
  const { data, error } = useUser();
  if (!data) return <div className="text-center">読込み中...</div>;
  if (error) return <div>エラー が発生しました</div>;
  if (data.user?.role !== "ADMIN") return null;
  return <CurrentlyApplying />;
};
