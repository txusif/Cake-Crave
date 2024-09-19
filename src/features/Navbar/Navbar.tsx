import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../Cart/useCart";
import UserDetails from "./UserDetails";
import Menu from "./Menu";
import { useAppContext } from "@/store/AppContext";
import Logo from "@/ui/Logo";

export default function Navbar() {
  const { data: cartData } = useCart();
  const {
    setIsCartOpen,
  }: { setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>> } =
    useAppContext();
  const cartLength = cartData?.length;
  const navigate = useNavigate();

  function handleSearch() {
    navigate("/search");
    setIsCartOpen(false);
  }
  function handleClickCart() {
    setIsCartOpen((ps) => (ps === true ? false : true));
  }

  return (
    <header className="outline:LightGrey pointer-events-auto sticky bottom-0 flex h-[60px] items-center justify-between border-b-[2px] border-LightGrey bg-White px-2 sm:h-[80px] sm:px-12 md:h-[100px] md:px-24">
      <div>
        <Link to={"/"}>
          <Logo size="w-[60px] sm:w-[80px] md:w-[100px] " />
        </Link>
      </div>
      <div className="flex items-center gap-6 sm:gap-12">
        <div className="flex gap-3 sm:gap-6">
          <FiSearch
            className="cursor-pointer text-2xl text-Grey sm:text-3xl"
            onClick={handleSearch}
          />

          <div className="relative">
            <span className="absolute right-[-6px] top-[-4px] flex h-4 w-4 items-center justify-center rounded-full bg-DarkRed text-xs font-medium text-White sm:right-[-8px] sm:top-[-6px] sm:h-5 sm:w-5 sm:text-sm">
              {cartLength}
            </span>
            <FiShoppingCart
              className="cursor-pointer text-2xl text-Grey sm:text-3xl"
              onClick={handleClickCart}
            />
          </div>
        </div>
        <div className="relative self-end">
          <UserDetails />
          <Menu />
        </div>
      </div>
    </header>
  );
}
