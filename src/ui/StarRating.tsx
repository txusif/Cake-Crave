import { useEffect, useState } from "react";
import { HiMiniStar } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

export default function StarRating({ maxRating = 5, curRating = 0 }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rating, setRating] = useState<number>(() => {
    const ratingFromParams = searchParams.get("rating");
    if (ratingFromParams) {
      return Number(ratingFromParams);
    } else {
      return 0;
    }
  });

  const [hover, setHover] = useState(0);

  function handleClick(i: number) {
    if (i === rating) {
      setRating(0);
    } else {
      setRating(i);
    }
  }

  useEffect(() => {
    searchParams.set("rating", String(rating));
    setSearchParams(searchParams);
    if (Number(searchParams.get("rating")) === 0) {
      searchParams.delete("rating");
      setSearchParams(searchParams);
    }
  }, [rating, searchParams, setSearchParams]);

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <h3 className="text-xs font-medium text-Grey sm:text-base">Rating</h3>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(maxRating)].map((_, i) => {
            const full = rating ? Number(rating) > i : curRating >= i + 1;
            return (
              <span
                className="flex-auto"
                key={i}
                onClick={() => handleClick(i + 1)}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(rating)}
              >
                {full ? (
                  <HiMiniStar
                    className={`cursor-pointer text-2xl text-Yellow`}
                  />
                ) : (
                  <HiMiniStar
                    className={`cursor-pointer text-2xl text-gray-200`}
                  />
                )}
              </span>
            );
          })}
        </div>
        <span className="text-md mb-[-4px] flex w-3 items-center font-medium text-Grey">
          {hover || rating || (rating === 0 && "All")}
        </span>
      </div>
    </div>
  );
}
