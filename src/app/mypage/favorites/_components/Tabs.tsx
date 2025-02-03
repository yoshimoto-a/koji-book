import { Tab } from "../_types/Tab";

interface Props {
  active: Tab[];
  setActive: React.Dispatch<React.SetStateAction<Tab[]>>;
}
export const Tabs: React.FC<Props> = ({ active, setActive }) => {
  const settingTab = (selected: Tab) => {
    setActive(prev =>
      prev.includes(selected)
        ? prev.filter(tab => tab !== selected)
        : [...prev, selected]
    );
  };
  return (
    <div className="flex justify-start items-center gap-3">
      <button
        type="button"
        className={`py-1 px-2 rounded-md ${
          active.includes("malts")
            ? "bg-dark_brown text-white"
            : "text-dark_brown border-dark_brown"
        }`}
        onClick={() => settingTab("malts")}
      >
        麹調味料
      </button>
      <button
        type="button"
        className={`py-1 px-2 rounded-md ${
          active.includes("recipes")
            ? "bg-dark_brown text-white"
            : "text-dark_brown border-dark_brown"
        }`}
        onClick={() => settingTab("recipes")}
      >
        レシピ
      </button>
    </div>
  );
};
