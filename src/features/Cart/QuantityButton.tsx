import { useAppContext } from "@/store/AppContext";
import { useCouponRemover } from "@/utils/useCouponRemover";

export default function QuantityButton({ item }) {
  const { handleDecrease, handleIncrease, isCartLoading } = useAppContext();
  useCouponRemover();

  function handleClickDec(item) {
    handleDecrease(item);
  }

  function handleClickInc(item) {
    handleIncrease(item);
  }

  return (
    <div className="flex h-6 items-center rounded-[4px] border border-Yellow bg-LightYellow text-Orange">
      <button
        className="p-1 disabled:cursor-not-allowed"
        onClick={() => handleClickDec(item)}
        disabled={isCartLoading}
      >
        {"-"}
      </button>
      <span className="mt-[1px] flex h-full items-center p-1 text-sm">
        {item?.quantity}
      </span>
      <button
        className="p-1 disabled:cursor-not-allowed"
        onClick={() => handleClickInc(item)}
        disabled={isCartLoading}
      >
        {"+"}
      </button>
    </div>
  );
}
