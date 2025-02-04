import NextLink from "next/link";
interface Props {
  href: string;
  children: React.ReactNode;
}
export const Link: React.FC<Props> = ({ href, children }) => {
  return (
    <NextLink
      href={href}
      className="border-solid border-[1px] w-full h-full rounded-lg py-3 bg-dark_brown text-white hover:bg-white hover:text-dark_brown px-4"
    >
      {children}
    </NextLink>
  );
};
