import { Dispatch, FC, SetStateAction, useMemo } from "react";
import classNames from "classnames";

interface PaginationProps {
  count: number;
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  maxSize?: number;
}

const Pagination: FC<PaginationProps> = ({
  count,
  active,
  setActive,
  maxSize = 7,
}) => {
  const arr = useMemo(() => {
    const arrLength = Math.min(maxSize, count);
    let startFrom = 0;

    if (maxSize >= count) {
    } else if (active > count - Math.ceil(maxSize / 2)) {
      startFrom = count - maxSize;
    } else if (active > Math.floor(maxSize / 2)) {
      startFrom = active - Math.floor(maxSize / 2);
    }

    return Array.from({ length: arrLength }, (_, i) => i + startFrom);
  }, [count, active, maxSize]);

  if (count < 0) return null;

  return (
    <div className="join">
      {arr[0] !== 0 && (
        <button className={"join-item btn"} onClick={() => setActive(0)}>
          First
        </button>
      )}
      {arr.map((item) => (
        <button
          key={item}
          className={classNames("join-item btn", {
            "btn-active": item === active,
          })}
          onClick={() => setActive(item)}
        >
          {item + 1}
        </button>
      ))}
      {arr[arr.length - 1] !== count - 1 && (
        <button
          className={"join-item btn"}
          onClick={() => setActive(count - 1)}
        >
          Last
        </button>
      )}
    </div>
  );
};

export default Pagination;
