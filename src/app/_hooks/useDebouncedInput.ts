import { useState, useEffect } from "react";

interface Prams {
  onUpdate: (searchKeyword: string) => void;
  initialKeyword: string;
}
export const useDebouncedInput = ({ initialKeyword, onUpdate }: Prams) => {
  const [word, setWord] = useState(initialKeyword);

  // searchKeywordが変更されたらdebounce処理
  useEffect(() => {
    const handler = setTimeout(() => {
      onUpdate(word);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [word, onUpdate]);
  return { word, setWord };
};
