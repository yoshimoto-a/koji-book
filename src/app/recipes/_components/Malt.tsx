interface Props {
  item: string;
}
export const Malt: React.FC<Props> = ({ item }) => {
  return (
    <span className="bg-dark_brown text-white px-3 py-1 rounded-sm">
      {item}
    </span>
  );
};
