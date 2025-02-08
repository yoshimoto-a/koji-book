import Image from "next/image";
import Link from "next/link";

export const InstagramIcon: React.FC = () => {
  return (
    <Link href={"https://www.instagram.com/akane_code"} target="_blank">
      <Image
        alt="instagram"
        src={"/Instagram_Glyph.svg"}
        width={40}
        height={40}
        className={"w-[32px] h-[32px] "}
      />
    </Link>
  );
};
