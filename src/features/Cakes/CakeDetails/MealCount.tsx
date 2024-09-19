import { useAppContext } from "@/store/AppContext";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

export default function MealCount({ cartData, item }) {
  const {
    handleIncrease,
    handleDecrease,
    isCartLoading,
    handleDelete,
    handleAddItem,
  } = useAppContext();

  const mealToUpdate = cartData.find((meal) => meal.id === item.id);

  const {
    id,
    name,
    price,
    quantity = 0,
    ingredients,
    totalPrice,
  } = mealToUpdate || [];

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
      const { id, name, price, ingredients, quantity = 1 } = item;
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
        className={`basis[200px] flex w-full items-center justify-center px-4 text-Grey ${isCartLoading && "cursor-pointer"} ${mealToUpdate === undefined && "cursor-not-allowed"}`}
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
