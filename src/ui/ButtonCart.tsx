import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { useCart } from "../features/Cart/useCart";
import { useCouponRemover } from "@/utils/useCouponRemover";
import { useAppContext } from "@/store/AppContext";
import { CakeType } from "@/services/apiCakes";

export default function ButtonCart({ item }: { item: CakeType }) {
  const { handleAddItem, removeItem, isCartLoading } = useAppContext();
  const { data: cartData } = useCart();
  useCouponRemover();

  let isInCart = cartData?.map((item) => item.id).includes(item.id);

  function handleClick(item: CakeType, e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!isInCart) {
      const { id, name, price, ingredients } = item;
      const newItem = {
        id,
        name,
        quantity: 1,
        price: Math.ceil(price),
        ingredients,
        totalPrice: Math.ceil(price),
      };
      handleAddItem(newItem);
    } else {
      removeItem(item.id);
    }
  }

  return (
    <button
      disabled={isCartLoading}
      onClick={(e) => handleClick(item, e)}
      className={`flex w-full items-center justify-center gap-1 rounded-md border-2 py-1 text-White shadow-md transition duration-100 active:scale-100 disabled:cursor-not-allowed ${isInCart ? "border-DarkRed bg-Red" : "border-DarkGreen bg-Green"}`}
    >
      <span className="text-sm font-medium">
        {isInCart ? "Remove" : "Add to cart"}
      </span>
      {isInCart ? <IoIosRemoveCircle /> : <IoIosAddCircle />}
    </button>
  );
}
