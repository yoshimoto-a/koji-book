"use client";
import { Button } from "@/app/_components/Button";
import { useAddAritcleForm } from "../_hooks/useAddAritcleForm";
import { Input } from "@/app/_components/Input";
import { Textarea } from "@/app/_components/Textarea";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { RecipeImage } from "@/app/_components/RecipeImage";
import { TipsArea } from "./TipsArea";
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
    setDeleteImageUrls,
    options,
    cancel,
  } = useAddAritcleForm();

  return (
    <form onSubmit={handleSubmit} className="pt-5 flex flex-col gap-5">
      <div>
        <RecipeImage
          disabled={isSubmitting}
          imageUrl={watch("imageUrl")}
          onChangeImageUrl={v => setValue("imageUrl", v)}
          setDeleteImageUrls={setDeleteImageUrls}
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
                  singleValue: () => "!text-dark_brown",
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
        {...register("title")}
      />
      <Textarea
        label="材料"
        disabled={isSubmitting}
        id="material"
        placeholder="・・・"
        errors={errors.material}
        {...register("material")}
      />
      <TipsArea
        value={watch("tips")}
        setValue={val => setValue("tips", val)}
        error={errors.tips}
        isSubmitting={isSubmitting}
        register={register}
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
