import { useState } from "react";
import { IoHome } from "react-icons/io5";
import NoSearchData from "./NoSearchData";

import SearchMessage from "./SearchMessage";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/ui/LoadingScreen";
import SearchItem from "./SearchItem";
import { useCakes } from "../Cakes/useCakes";
import { CakeType } from "@/services/apiCakes";

export default function SearchInput() {
  const [isClicked, setIsClicked] = useState(false);
  const { cakeItems, isLoading } = useCakes();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  window.scrollTo({
    top: 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleClick() {
    navigate(-1);
  }

  let searchResults: CakeType[] = [];
  searchResults = (cakeItems ?? []).filter((meal) =>
    meal.name
      .toLowerCase()
      .replace(" ", "")
      .includes(input.toLowerCase().replace(" ", "")),
  );

  return (
    <>
      <div className="h-[60px] w-full sm:h-[80px] md:h-[100px]"></div>

      <div className="flex w-full flex-col items-center justify-center gap-8 p-4 sm:gap-12 sm:p-10 md:px-24">
        <div
          className={`flex w-full text-MediumGrey sm:w-[500px] sm:items-center sm:justify-center ${isClicked && "rounded-md outline outline-[2px] outline-Orange"}`}
          onClick={() => setIsClicked(true)}
          onBlur={() => setIsClicked(false)}
        >
          <input
            className="h-[40px] w-full rounded-md rounded-r-none bg-LightGrey p-3 text-lg font-medium text-DarkGrey focus-visible:outline-none sm:h-[50px] sm:w-[500px]"
            type="text"
            onChange={(e) => handleChange(e)}
          />
          <IoHome
            className="h-[40px] w-[40px] cursor-pointer rounded-md rounded-l-none bg-LightGrey p-1 text-4xl text-Grey transition duration-200 hover:text-MediumGrey sm:h-[50px] sm:w-[50px] sm:p-2"
            onClick={handleClick}
          />
        </div>
        {input === "" && <SearchMessage />}
        {isLoading && <LoadingScreen />}
        {input !== "" && !isLoading && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
            {searchResults?.length === 0 ? (
              <NoSearchData />
            ) : (
              <SearchItem searchResults={searchResults} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
