import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loader = () => {
  return (
    <div className="px-2">
      {[0, 0, 0, 0, 0, 0, 0].map((val, index) => (
        <div key={index}>
          <Skeleton height={30} />
          <Skeleton count={2} height={15} />
        </div>
      ))}

      <div>
        <Skeleton height={30} />
        <Skeleton count={1} height={15} />
      </div>
    </div>
  );
};

export default Loader;
