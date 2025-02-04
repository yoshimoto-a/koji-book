import Link from "next/link";
interface Props {
  action: "signup" | "login";
}
export const Button: React.FC<Props> = ({ action }) => {
  return (
    <Link
      href={`/${action}`}
      className="py-2 px-3 rounded-md border-dark_brown text-dark_brown border-2"
    >
      {action === "login" ? "サインイン" : "サインアップ"}
    </Link>
  );
};
