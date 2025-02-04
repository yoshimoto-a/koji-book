export const Footer: React.FC = () => {
  return (
    <footer className="bg-light_beige w-full h-8 z-10 flex justify-center items-center">
      <p className="text-xs">
        &copy; {new Date().getFullYear()} koji-book. All rights reserved.
      </p>
    </footer>
  );
};
