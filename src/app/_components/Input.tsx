"use client";
import React, { ComponentPropsWithRef } from "react";
import { FieldError } from "react-hook-form";

interface Props extends ComponentPropsWithRef<"input"> {
  label?: string;
  errors?: FieldError;
}

export const Input: React.FC<Props> = ({ label, errors, ...props }) => {
  return (
    <div className="">
      <label>{label}</label>
      <input
        {...props}
        className="bg-custom-gray py-2 px-3 mb-1 leading-tight w-full border-[1px] border-dark_brown text-dark_brown placeholder:text-dark_brown rounded-lg"
      />
      {errors && typeof errors.message === "string" && (
        <p className="text-sm text-red-500">{errors.message}</p>
      )}
    </div>
  );
};
