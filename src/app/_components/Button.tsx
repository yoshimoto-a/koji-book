"use client";
import { ReactNode, ComponentPropsWithRef } from "react";
type Variant = "dark" | "light";
interface Props extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
  className?: string;
  variant?: Variant;
}

export const Button: React.FC<Props> = ({
  children,
  className,
  variant = "dark",
  ...props
}) => {
  const color = () => {
    switch (variant) {
      case "dark":
        return "bg-dark_brown text-white hover:bg-white hover:text-dark_brown";
      case "light":
        return "bg-light_beige text-dark_brown hover:bg-dark_brown hover:text-white border-dark_brown";
    }
  };
  return (
    <button
      {...props}
      className={`border-solid border-[1px] w-full h-full rounded-lg py-1 ${className} ${color()}`}
    >
      {children}
    </button>
  );
};
