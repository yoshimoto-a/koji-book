"use client";
import Image from "next/image";
import React, { ChangeEvent, createRef } from "react";
import { Button } from "@/app/_components/Button";
import { uploadImage } from "@/app/_utils/uploadImage";
interface Props {
  imageUrl: string | null;
  onChangeImageUrl: (iconUrl: string) => void;
  disabled: boolean;
  setDeleteImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

export const RecipeImage: React.FC<Props> = ({
  imageUrl,
  onChangeImageUrl,
  disabled,
  setDeleteImageUrls,
}) => {
  const fileInputRef = createRef<HTMLInputElement>();

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) return;
    const file = event.target.files[0]; // 選択された画像を取得
    const { imageUrl } = await uploadImage({ file });
    onChangeImageUrl(imageUrl || "");
  };

  const deleteIcon = async () => {
    if (!imageUrl) return;
    setDeleteImageUrls(url => [...url, imageUrl]);
    onChangeImageUrl("");
  };

  return (
    <div className="flex flex-col gap-2">
      {imageUrl ? (
        <div className="flex flex-col items-center gap-4">
          <Image
            src={imageUrl}
            alt="recipe image"
            className="w-full h-44 border object-contain"
            width={400}
            height={400}
          />
          <div className="flex justify-between gap-3">
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3"
              disabled={disabled}
            >
              変更
            </Button>
            <Button
              type="button"
              onClick={deleteIcon}
              className="px-3 text-white"
              disabled={disabled}
            >
              削除
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="flex flex-col items-center justify-center border border-dark_brown text-xs text-gray_text w-full h-[200px] bg-light_beige rounded-md"
          >
            <Image
              alt="画像を選択する"
              width={400}
              height={400}
              src="/cameraIcon.svg"
              className="w-1/3 object-contain"
            />
            <p>料理の写真をのせる</p>
          </button>
        </div>
      )}

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        ref={fileInputRef}
        disabled={disabled}
      />
    </div>
  );
};
