interface Prors {
  item: string;
}
export const Malt: React.FC<Prors> = ({ item }) => {
  return (
    <span className="bg-dark_brown text-white px-3 py-1 rounded-sm">
      {item}
    </span>
  );
};
