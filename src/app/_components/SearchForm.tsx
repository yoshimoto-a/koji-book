import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebouncedInput } from "../_hooks/useDebouncedInput";
interface Props {
  onSearch: (searchKeyword: string) => void;
  initialKeyword: string;
}
export const SearchForm: React.FC<Props> = ({ onSearch, initialKeyword }) => {
  const { word, setWord } = useDebouncedInput({
    initialKeyword,
    onUpdate: onSearch,
  });
  return (
    <div className="flex h-12 rounded-lg border px-6 border-dark_brown">
      <input
        className="w-full focus:outline-none placeholder:text-dark_brown"
        placeholder="材料/料理名/作り方から検索"
        value={word}
        onChange={e => setWord(e.target.value)}
      />
      {word && (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => setWord("")}
        >
          <FontAwesomeIcon icon={faTimes} className="size-4 text-gray_text" />
        </div>
      )}
    </div>
  );
};
