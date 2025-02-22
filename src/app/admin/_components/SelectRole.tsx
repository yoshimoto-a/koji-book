import { MaltRole } from "@prisma/client";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { api } from "@/app/_utils/api";
import { PutRequest } from "@/app/_types/Admin/malts/Role/PutRequest";
import { useAdminMalts } from "../_hooks/useAdminMalts";

interface Props {
  value: MaltRole;
  articleId: string;
}
interface Option {
  value: MaltRole;
  label: string;
}

export const SelectRole: React.FC<Props> = ({ value, articleId }) => {
  const [role, setRole] = useState<MaltRole>(value);
  const { mutate } = useAdminMalts();
  const options: Option[] = [
    { value: MaltRole.MAIN, label: "メインレシピ" },
    { value: MaltRole.SUB, label: "サブレシピ" },
  ];
  const selectedOption = options.find(option => option.value === role);

  const handleChange = async (selectedOption: SingleValue<Option>) => {
    if (!selectedOption) return;
    setRole(selectedOption.value);
    try {
      await api.put<PutRequest, { message: string }>(
        `/api/admin/malts/${articleId}/role`,
        { maltRole: selectedOption.value }
      );
      mutate();
    } catch (e) {
      console.error(e);
      alert(e);
    }
  };
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
