"use client";

import { Button } from "@/app/_components/Button";
import { useAddAritcleForm } from "../_hooks/useAddAritcleForm";
import { Input } from "@/app/_components/Input";
import { Textarea } from "@/app/_components/Textarea";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { Status } from "@prisma/client";
import { RecipeImage } from "@/app/_components/RecipeImage";
type Option = { value: Status; label: string };

export const ArticleForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    categories,
    watch,
  } = useAddAritcleForm();

  const options: Option[] = [
    { value: Status.DRAFT, label: "下書き保存" },
    { value: Status.PUBLIC, label: "公開する" },
  ];
  return (
    <form onSubmit={handleSubmit} className="pt-10 flex flex-col gap-5">
      <div>
        <RecipeImage
          disabled={isSubmitting}
          imageUrl={watch("imageUrl")}
          onChangeImageUrl={v => setValue("imageUrl", v)}
        />
        <label htmlFor="maltArticleId">使用する麹調味料</label>
        {categories && (
          <Controller
            name="maltArticleId"
            control={control}
            render={({ field }) => (
              <Select
                options={categories}
                value={categories.find(option => option.value === field.value)}
                onChange={newValue => {
                  field.onChange(newValue?.value);
                }}
                classNames={{
                  control: () =>
                    "!border-dark_brown !outline-none !text-dark_brown",
                  placeholder: () => "!text-dark_brown ",
                  dropdownIndicator: () => " !text-dark_brown",
                  indicatorSeparator: () => "!bg-dark_brown",
                }}
              />
            )}
          />
        )}

        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>
      <Input
        label="タイトル"
        disabled={isSubmitting}
        id="title"
        inputMode="text"
        placeholder="タイトル名を入力"
        type="text"
        errors={errors.title}
        register={register("title")}
      />
      <Textarea
        label="材料"
        disabled={isSubmitting}
        id="material"
        placeholder="・・・"
        errors={errors.material}
        register={register("material")}
      />
      <Textarea
        label="作り方"
        disabled={isSubmitting}
        id="tips"
        placeholder="①・・・"
        errors={errors.tips}
        register={register("tips")}
      />
      <div>
        <label htmlFor="status">ステータス</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              options={options}
              value={options.find(option => option.value === field.value)}
              onChange={newValue => {
                field.onChange(newValue?.value);
              }}
              classNames={{
                control: () =>
                  "!border-dark_brown !outline-none !text-dark_brown",
                placeholder: () => "!text-dark_brown ",
                dropdownIndicator: () => " !text-dark_brown",
                indicatorSeparator: () => "!bg-dark_brown",
              }}
            />
          )}
        />
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      <Button type="submit">保存</Button>
    </form>
  );
};
