"use client";
import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface Props {
  id: string;
  placeholder: string;
  disabled: boolean;
  label: string;
  register: UseFormRegisterReturn;
  errors?: FieldError;
}

export const Textarea = ({
  id,
  placeholder,
  disabled,
  label,
  errors,
  register,
}: Props) => {
  return (
    <div className="pb-5">
      <label>{label}</label>
      <textarea
        className="bg-custom-gray py-2 px-3 mb-1 leading-tight w-full border-[1px] border-dark_brown text-dark_brown placeholder:text-dark_brown rounded-lg"
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        {...register}
      />
      {errors && typeof errors.message === "string" && (
        <p className="text-sm text-red-500">{errors.message}</p>
      )}
    </div>
  );
};
