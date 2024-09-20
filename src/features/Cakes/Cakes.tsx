import NoData from "@/ui/NoData";
import { useCakes } from "./useCakes";
import CakeItem from "./CakeItem";
import SmallLoader from "@/ui/SmallLoader";

export default function Cakes() {
  const { cakeItems, isLoading: isLoadingCakes } = useCakes();
  const cakeLength = cakeItems?.length || 0;

  return (
    <div className="flex w-[100%] flex-col gap-4 bg-white px-4 py-4 sm:px-10 sm:py-10 md:gap-6 md:px-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <h1 className="text-xl font-bold text-DarkGrey sm:text-2xl">
            Popular Cakes
          </h1>
          {isLoadingCakes && <SmallLoader showLoading={false} />}
        </div>
        <p className="text-xs font-medium text-Grey sm:text-sm">
          Meals found :{" "}
          <span className="text-lg font-semibold text-Green sm:text-xl">
            {cakeLength < 10 ? `0${cakeLength}` : cakeLength}
          </span>
        </p>
      </div>
      <div className="flex flex-wrap justify-evenly gap-x-2 gap-y-6 sm:gap-x-4 sm:gap-y-8">
        {cakeItems?.length === 0 ? <NoData /> : <CakeItem />}
      </div>
    </div>
  );
}
