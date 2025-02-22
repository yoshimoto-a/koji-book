"use client";
import { useEffect } from "react";
import { useUser } from "../_hooks/useUser";
import { useRouter } from "next/navigation";
export default function Admin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = useUser();
  const { push } = useRouter();
  useEffect(() => {
    if (!data) return;
    if (!data.user) return;
    if (data.user.role === "MEMBER") {
      push("/");
    }
  }, [data, push]);
  return <div>{children}</div>;
}
