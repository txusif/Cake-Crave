import { useCoupon } from "./useCoupon";
import { useRemoveCoupon } from "./useRemoveCoupon";

export default function CouponDiscount() {
  const { data, isLoading } = useCoupon();
  const { removeCoupon, isPending } = useRemoveCoupon();
  const calMethod = data[0]?.calMethod === "percentage" ? "%" : "";

  function handleClickRemove() {
    removeCoupon();
  }

  return (
    <div
      className="flex justify-between gap-6 rounded-md p-4 outline outline-1 outline-Grey/50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-1">
        {data[0]?.calMethod === "percentage" ? (
          <h3 className="text-[14px] font-semibold text-Green">{`${data[0]?.couponValue}${calMethod} OFF`}</h3>
        ) : (
          <h3 className="text-[14px] font-semibold text-Green">{`₹${data[0]?.couponValue} OFF`}</h3>
        )}
        <p className="text-[12px] font-normal text-Grey">
          Offer applied on the bill
        </p>
      </div>
      <button
        className="text-xs font-semibold text-Orange hover:text-orange-500"
        disabled={isLoading || isPending}
        onClick={handleClickRemove}
      >
        Remove
      </button>
    </div>
  );
}
