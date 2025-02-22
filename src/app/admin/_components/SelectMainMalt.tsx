import { useState } from "react";
import { useCategories } from "@/app/recipes/_hooks/useCategories";
import Select, { SingleValue } from "react-select";
import { api } from "@/app/_utils/api";
import { PutRequest } from "@/app/_types/Admin/malts/Parent/PutRequest";
import { useAdminMalts } from "../_hooks/useAdminMalts";
interface Props {
  value: string | null;
  articleId: string;
}
interface Option {
  value: string;
  label: string;
}

export const SelectMainMalt: React.FC<Props> = ({ value, articleId }) => {
  const [malt, setMalt] = useState(value);
  const { data, error } = useCategories();
  const { mutate } = useAdminMalts();
  const handleChange = async (selectedOption: SingleValue<Option>) => {
    if (!selectedOption) return;
    setMalt(selectedOption.value);
    try {
      await api.put<PutRequest, { message: string }>(
        `/api/admin/malts/${articleId}/parent`,
        { parentId: selectedOption.value }
      );
      mutate();
    } catch (e) {
      console.error(e);
      alert(e);
    }
  };
  if (!data) return <div>取得中...</div>;
  if (error) return <div>{error.message}</div>;
  const options: Option[] = data.maltArticles.map(article => ({
    value: article.id,
    label: article.title,
  }));

  const selectedOption = options.find(option => option.value === malt);
  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      classNames={{
        control: () => "!border-dark_brown !outline-none !text-dark_brown",
        placeholder: () => "!text-dark_brown",
        dropdownIndicator: () => "!text-dark_brown",
        indicatorSeparator: () => "!bg-dark_brown",
        singleValue: () => "!text-dark_brown",
      }}
    />
  );
};
