import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { currencyFormatter } from "@/utils/helper";
import { useCakePrice } from "@/features/Cakes/useCakePrice";

export default function Range() {
  const { cakePriceList, isLoading: isPriceLoading } = useCakePrice();
  const [searchParams, setSearchParams] = useSearchParams();
  let maxPrice: number = 0;
  if (!isPriceLoading) {
    maxPrice = Math.max(...cakePriceList);
  }

  const [price, setPrice] = useState(() => {
    if (searchParams.get("price")) {
      return Number(searchParams.get("price"));
    } else {
      return 0;
    }
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPrice(Number(e.target.value));
  }

  let minPrice: number = 0;
  if (!isPriceLoading) {
    minPrice = Math.min(...cakePriceList);
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (price >= minPrice) {
        searchParams.set("price", String(price));
        setSearchParams(searchParams);
      }
      if (price < minPrice) {
        searchParams.delete("price");
        setSearchParams(searchParams);
      }
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [price, searchParams, setSearchParams, minPrice]);

  return (
    <div className="flex flex-col sm:gap-2">
      <h3 className="text-xs font-medium text-Grey sm:text-base">Price</h3>
      <div className="flex flex-col sm:gap-1">
        <div className="flex items-center space-x-2">
          <span className="flex w-8 items-center text-sm font-medium text-Grey sm:text-base">
            {price < 100 ? `0${price}` : price}
          </span>
          <input
            type="range"
            id="price"
            className="price cursor-pointer"
            name="price"
            min={0}
            max={maxPrice + 20}
            step={20}
            value={price || 0}
            onChange={handleChange}
            disabled={isPriceLoading}
          />
          <span className="mt-auto flex items-center justify-center text-sm font-medium text-Grey sm:text-base">
            {maxPrice}
          </span>
        </div>
        {price < minPrice && price !== 0 && (
          <p className="text-xs text-Red sm:text-sm">
            Sorry no cakes under {`₹ ` + currencyFormatter(minPrice)}
          </p>
        )}
      </div>
    </div>
  );
}
