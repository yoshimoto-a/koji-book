"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useServiceWorker } from "../_hooks/useServiceWorker";
import { Button } from "./Button";
import { useUser } from "../_hooks/useUser";
export const ServiceWorker: React.FC = () => {
  const { data } = useUser();
  const {
    isSupported,
    registerServiceWorker,
    isDisplay,
    setIsDisplay,
    isSubmitting,
  } = useServiceWorker();

  if (!data) return null;
  if (!isSupported) return null;
  if (!isDisplay) return null;
  return (
    <div className="fixed bottom-0 right-0 z-20 w-2/3 rounded-md border-[3px] border-dark_brown bg-light_beige px-3 pb-2 pt-1 text-sm ">
      <div className="relative pt-4">
        <button
          type="button"
          className={`absolute right-0 top-0 z-[999]`}
          onClick={() => setIsDisplay(false)}
        >
          <FontAwesomeIcon className="text-[#ACAAA9]" icon={faXmark} />
        </button>
        <p>コメントが届いたらプッシュを受け取ることが出来ます！</p>
        <div className="w-full pt-2">
          <Button onClick={registerServiceWorker} disabled={isSubmitting}>
            受け取る
          </Button>
        </div>
      </div>
    </div>
  );
};
