import React, { ReactNode } from "react";
import Link from "next/link";
interface Props {
  url: string;
  children: ReactNode;
}
export const PageLink: React.FC<Props> = ({ url, children }) => {
  return (
    <Link
      href={url}
      className="bg-dark_brown text-white rounded-md py-1 px-3 hover:bg-white hover:text-dark_brown border-solid border-[1px]"
    >
      {children}
    </Link>
  );
};
