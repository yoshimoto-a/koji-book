"use client";
import { Textarea } from "@/app/_components/Textarea";
import { UseFormRegister, FieldError } from "react-hook-form";
import { Form } from "../_hooks/useAddAritcleForm";
import { useState, useEffect } from "react";
import { InputSupport } from "./InputSupport";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
interface Props {
  value: string;
  setValue: (value: string) => void;
  isSubmitting: boolean;
  register: UseFormRegister<Form>;
  error: FieldError | undefined;
  edit?: boolean;
}
const theme = createTheme({
  palette: {
    primary: {
      main: "#AF8C69",
    },
    common: {
      black: "#AF8C69",
    },
  },
});

export const TipsArea: React.FC<Props> = ({
  value,
  setValue,
  isSubmitting,
  register,
  error,
  edit = false,
}) => {
  const [mode, setMode] = useState<"support" | "free">("free");
  const changeMode = () => {
    //まだ何も入力していない場合は即切替え
    if (!value) {
      setMode(mode => (mode === "free" ? "support" : "free"));
      return;
    }
    //入力内容破棄していいか確認してから削除して切替ええ
    if (!confirm("入力内容は消えます。入力モードを切り替えますか?")) return;
    setValue("");
    setMode(mode => (mode === "free" ? "support" : "free"));
  };
  //編集画面の場合は内容に応じてモード切り替える
  useEffect(() => {
    if (!edit) return;
    const mode = /###(?:STEP|TIPS)\d+###/.test(value) ? "support" : "free";
    setMode(mode);
  }, [edit, value]);
  return (
    <div className="">
      <div className="flex justify-between gap-2 relative">
        <p className="py-2">作り方</p>
        <ThemeProvider theme={theme}>
          <div className="relative flex flex-col items-center pb-3">
            <Switch
              onChange={changeMode}
              checked={mode === "support"}
              color="primary"
              className="relative"
            />
            <div className="text-[10px] absolute top-8">採番モード</div>
          </div>
        </ThemeProvider>
      </div>
      {mode === "free" ? (
        <Textarea
          disabled={isSubmitting}
          id="tips"
          placeholder="作り方を入力してください"
          errors={error}
          {...register("tips")}
        />
      ) : (
        <InputSupport setValue={setValue} value={value} />
      )}
    </div>
  );
};
