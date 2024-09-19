import { Link } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useAppContext } from "@/store/AppContext";
import useLogout from "../Authentication/useLogout";

type AppContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Menu() {
  const { isMenuOpen, setIsMenuOpen, setIsCartOpen }: AppContextType =
    useAppContext();
  const { logout } = useLogout();

  return (
    <div
      className={` ${isMenuOpen ? "inline-block" : "hidden"} absolute left-0 top-[45px] z-50 select-none overflow-hidden rounded-md bg-White shadow-xl outline outline-[1px] outline-Grey/50 sm:top-[60px]`}
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
        setIsCartOpen(false);
      }}
    >
      <Link
        className="flex items-center justify-between gap-2 px-6 py-2 text-sm font-light tracking-wide text-Grey outline outline-[1px] outline-LightGrey transition duration-150 hover:bg-LightGrey hover:text-MediumGrey"
        to={"/profile"}
      >
        Profile
        <FaUserCog className="text-[16px]" />
      </Link>
      <div
        className="flex cursor-pointer items-center justify-between gap-2 px-6 py-2 text-sm font-light tracking-wide text-Grey transition duration-150 hover:bg-LightGrey hover:text-MediumGrey"
        onClick={() => logout()}
      >
        Logout
        <MdLogout className="text-[16px]" />
      </div>
    </div>
  );
}
