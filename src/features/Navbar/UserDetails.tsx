import React from "react";
import { useAppContext } from "@/store/AppContext";

type AppContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  avatar: string;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserDetails() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    userName,
    avatar,
    setIsCartOpen,
  }: AppContextType = useAppContext();

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    setIsCartOpen(false);
  }

  return (
    <div
      className="flex cursor-pointer select-none items-center gap-2 text-xs sm:text-sm"
      onClick={(e) => handleClick(e)}
    >
      <div className="h-[30px] w-[30px] overflow-hidden rounded-full sm:h-[40px] sm:w-[40px]">
        <img src={avatar} alt="placeholder" />
      </div>

      <div>
        <span className="font-normal text-Grey">Welcome, </span>
        <span className="font-semibold uppercase text-DarkGrey">
          {userName?.split(" ")[0] || "Txusif"}
        </span>
      </div>
    </div>
  );
}
