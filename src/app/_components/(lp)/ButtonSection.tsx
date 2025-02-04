import { Button } from "./Button";

export const ButtonSection: React.FC = () => {
  return (
    <div className="flex gap-5 justify-center">
      <Button action="signup" />
      <Button action="login" />
    </div>
  );
};
