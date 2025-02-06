import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <SkeletonTheme width="100%" height={30}>
        <Skeleton count={3} className="mb-4" />
      </SkeletonTheme>
    </div>
  );
};
