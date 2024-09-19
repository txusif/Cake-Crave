import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Range from "@/ui/Range";
import SortBy from "@/ui/SortBy";
import StarRating from "@/ui/StarRating";
import Switch from "@/ui/Switch";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isBtnOn, setIsBtnOn] = useState(() => {
    if (searchParams.get("type")) {
      return {
        vegan: searchParams.get("type") === "vegan" ? true : false,
        eggless: searchParams.get("type") === "eggless" ? true : false,
      };
    } else {
      return {
        vegan: false,
        eggless: false,
      };
    }
  });

  function handleVeganClick() {
    setIsBtnOn((ps) => {
      return {
        ...ps,
        vegan: ps.vegan ? false : true,
        eggless: false,
      };
    });
  }

  function handleEgglessClick() {
    setIsBtnOn((ps) => {
      return {
        ...ps,
        eggless: ps.eggless ? false : true,
        vegan: false,
      };
    });
  }

  useEffect(() => {
    if (isBtnOn.vegan) {
      searchParams.set("type", "vegan");
      setSearchParams(searchParams);
    }
    if (isBtnOn.eggless) {
      searchParams.set("type", "eggless");
      setSearchParams(searchParams);
    }
    if (isBtnOn.vegan === false && isBtnOn.eggless === false) {
      searchParams.delete("type");
      setSearchParams(searchParams);
    }
  }, [isBtnOn, searchParams, setSearchParams]);

  return (
    <div className="static top-[60px] z-10 flex w-full flex-col gap-3 bg-white p-4 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.06)] sm:top-[80px] sm:px-10 sm:py-8 md:top-[100px] md:px-24 lg:sticky">
      <h2 className="text-xl font-bold text-DarkGrey sm:text-2xl">Filters</h2>
      <div className="flex flex-wrap gap-x-12 gap-y-6 sm:justify-between sm:gap-y-10">
        <Switch
          handleVeganClick={handleVeganClick}
          isBtnOn={isBtnOn}
          title={"vegan"}
        />
        <Switch
          handleEgglessClick={handleEgglessClick}
          isBtnOn={isBtnOn}
          title={"eggless"}
        />
        <StarRating />
        <Range />
        <SortBy
          options={[
            { value: "price-asc", label: "By Price | 0-9" },
            { value: "price-desc", label: "By Price | 9-0" },
          ]}
        />
      </div>
    </div>
  );
}
