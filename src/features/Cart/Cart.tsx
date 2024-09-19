import { useCart } from "./useCart";

import { useAppContext } from "@/store/AppContext";
import SmallLoader from "@/ui/SmallLoader";
import NoData from "@/ui/NoData";
import CartItems from "./CartItem";

export default function Cart() {
  const {
    isCartOpen,
    isCartLoading,
    handleCloseCart,
  }: {
    isCartOpen: boolean;
    isCartLoading: boolean;
    handleCloseCart: () => void;
  } = useAppContext();
  const { data: cartData } = useCart();

  // Sorting the array of objects based on the 'name' property
  cartData?.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  function handleClickCloseCart(e: React.MouseEvent) {
    e.stopPropagation();
    handleCloseCart();
  }

  return (
    <>
      <div
        className={`${isCartOpen ? "open right-0" : "close right-[-576px]"} pointer-events-auto absolute right-0 z-20 inline-block h-full w-full cursor-pointer overflow-y-auto bg-White p-4 pb-[100px] text-DarkGrey shadow-xl transition-all duration-300 sm:w-[400px] sm:p-10 sm:pb-[140px] md:w-[450px] md:p-12 md:pb-[160px]`}
        onClick={(e) => handleClickCloseCart(e)}
      >
        <div className="mb-6 flex cursor-default justify-between gap-6">
          <h2 className="text-xl font-bold capitalize md:text-2xl">
            My orders
          </h2>
          {isCartLoading && <SmallLoader showLoading={false} />}
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          {(cartData?.length ?? 0) < 1 ? (
            <NoData />
          ) : (
            <CartItems cartData={cartData} />
          )}
        </div>
      </div>
      {isCartOpen && (
        <div
          className="pointer-events-auto hidden h-screen cursor-pointer bg-black/20 backdrop-blur-[2px] transition duration-300 sm:block"
          onClick={handleCloseCart}
        ></div>
      )}
    </>
  );
}
