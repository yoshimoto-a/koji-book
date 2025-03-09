"use client";

import { Button } from "@/app/_components/Button";
import { useEditAritcleForm } from "../_hooks/useEditArticleForm";
import { Input } from "@/app/_components/Input";
import { Textarea } from "@/app/_components/Textarea";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { Status } from "@prisma/client";
import { IndexResponse } from "@/app/_types/Recipe/IndexResponse";
import { RecipeImage } from "@/app/_components/RecipeImage";
import { TipsArea } from "@/app/recipes/new/_components/TipsArea";

type Option = { value: Status; label: string };
interface Props {
  data: IndexResponse;
}
export const ArticleForm: React.FC<Props> = ({ data }) => {
  const {
    register,
    control,
    handleSubmit,
    errors,
    isSubmitting,
    watch,
    setValue,
    categories,
    cancel,
    setDeleteImageUrls,
  } = useEditAritcleForm({
    data: data.recipeArticle,
  });
  const options: Option[] = [
    { value: Status.DRAFT, label: "下書き保存" },
    { value: Status.PUBLIC, label: "公開中" },
  ];
  return (
    <form onSubmit={handleSubmit} className="pt-10 flex flex-col gap-5">
      <RecipeImage
        imageUrl={watch("imageUrl")}
        disabled={isSubmitting}
        onChangeImageUrl={v => setValue("imageUrl", v)}
        setDeleteImageUrls={setDeleteImageUrls}
      />
      <div>
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
        placeholder="①米麹 100g・・・"
        errors={errors.material}
        {...register("material")}
      />
      <TipsArea
        value={watch("tips")}
        setValue={val => setValue("tips", val)}
        error={errors.tips}
        isSubmitting={isSubmitting}
        register={register}
        edit
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
          <p className="text-sm text-red-500 ">{errors.status.message}</p>
        )}
      </div>
      <Button type="submit">保存</Button>
      <Button type="button" variant="light" onClick={cancel}>
        キャンセル
      </Button>
    </form>
  );
};
