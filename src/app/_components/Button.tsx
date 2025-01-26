"use client";
import { ReactNode, ComponentPropsWithRef, forwardRef } from "react";

interface Props extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={`border-solid border-[1px] w-full h-full rounded-lg py-1 bg-dark_brown text-white hover:bg-white hover:text-dark_brown ${className}`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
