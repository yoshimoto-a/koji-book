"use client";

import { Button } from "@/app/_components/Button";
import { useAddAritcleForm } from "../_hooks/useAddAritcleForm";
import { Input } from "@/app/_components/Input";
import { Textarea } from "@/app/_components/Textarea";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { RecipeImage } from "@/app/_components/RecipeImage";

export const ArticleForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    errors,
    isSubmitting,
    watch,
    setValue,
    setDeleteImageUrls,
    cancel,
    options,
  } = useAddAritcleForm();

  return (
    <form onSubmit={handleSubmit} className="pt-5 flex flex-col gap-5">
      <RecipeImage
        imageUrl={watch("imageUrl")}
        disabled={isSubmitting}
        onChangeImageUrl={v => setValue("imageUrl", v)}
        setDeleteImageUrls={setDeleteImageUrls}
      />
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
        placeholder="①米麹 100g・・・"
        errors={errors.material}
        register={register("material")}
      />
      <Textarea
        label="作り方"
        disabled={isSubmitting}
        id="tips"
        placeholder="①材料をブレンダー等ですりおろす・・・"
        errors={errors.tips}
        register={register("tips")}
      />
      <Input
        label="発酵温度"
        disabled={isSubmitting}
        id="temperature"
        inputMode="numeric"
        placeholder="60"
        type="number"
        errors={errors.temperature}
        register={register("temperature")}
      />
      <Input
        label="発酵時間"
        disabled={isSubmitting}
        id="time"
        inputMode="numeric"
        placeholder="8"
        type="number"
        errors={errors.time}
        register={register("time")}
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
                singleValue: () => "!text-dark_brown",
              }}
            />
          )}
        />
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      <div className="flex gap-2 flex-col">
        <Button type="submit">保存</Button>
        <Button type="button" variant="light" onClick={cancel}>
          キャンセル
        </Button>
      </div>
    </form>
  );
};
