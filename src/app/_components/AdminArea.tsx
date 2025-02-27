"use client";
import { useUser } from "../_hooks/useUser";
import { CurrentlyApplying } from "./CurrentlyApplying";
export const AdminArea: React.FC = () => {
  const { data, error } = useUser();
  if (!data) return null;
  if (error) return null;
  if (!data.user) return null;
  if (data.user.role !== "ADMIN") return null;
  return <CurrentlyApplying />;
};
