import { CakeType } from "@/services/apiCakes";
import { useAppContext } from "@/store/AppContext";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

export type CartDataType = {
  created_at: string;
  id: number;
  ingredients: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

export default function CakeCount({
  cartData,
  item,
}: {
  cartData: CartDataType[];
  item: CakeType;
}) {
  const {
    handleIncrease,
    handleDecrease,
    isCartLoading,
    handleDelete,
    handleAddItem,
  } = useAppContext();

  const cakeToUpdate = cartData.find((cake) => cake.id === item.id);

  const {
    id = 0,
    name = "",
    price = 0,
    quantity = 0,
    ingredients = "",
    totalPrice = 0,
  } = cakeToUpdate || {};

  const updatedMeal = {
    id,
    name,
    price,
    quantity,
    ingredients,
    totalPrice,
  };

  function handleDecreaseCount() {
    if (quantity < 1) {
      handleDelete(item.id);
    } else {
      handleDecrease(updatedMeal);
    }
  }
  function handleIncreaseCount() {
    if (quantity === 0) {
      const { id, name, price, ingredients } = item;
      const quantity = 1;
      const newItem = {
        id,
        name,
        quantity,
        price: Math.ceil(price),
        ingredients,
        totalPrice: Math.ceil(price),
      };
      handleAddItem(newItem);
    } else {
      handleIncrease(updatedMeal);
    }
  }

  return (
    <div className="flex w-full items-center justify-center rounded-md bg-LightGrey text-xl outline outline-2 outline-Grey">
      <button
        className={`basis[200px] flex w-full items-center justify-center px-4 text-Grey ${isCartLoading && "cursor-pointer"} ${cakeToUpdate === undefined && "cursor-not-allowed"}`}
        disabled={isCartLoading}
        onClick={handleDecreaseCount}
      >
        <IoMdRemove className="stroke-[10px] text-lg" />
      </button>
      <span className="flex w-full justify-center px-4 text-xl font-semibold text-MediumGrey outline outline-2 outline-Grey">
        {quantity}
      </span>
      <button
        className={`flex w-full items-center justify-center px-4 text-Grey ${isCartLoading && "cursor-pointer"}`}
        disabled={isCartLoading}
        onClick={handleIncreaseCount}
      >
        <IoMdAdd className="stroke-[10px] text-lg" />
      </button>
    </div>
  );
}
