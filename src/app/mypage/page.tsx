"use client";
import { useUser } from "../_hooks/useUser";
export default function MyPage() {
  const { data } = useUser();
  console.log(data);
  return <div>マイページ</div>;
}
