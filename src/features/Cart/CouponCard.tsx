import { BiSolidOffer } from "react-icons/bi";
import { useApplyCoupon } from "./useApplyCoupon";
import { useCart } from "./useCart";
import { useAppContext } from "@/store/AppContext";

export default function CouponCard({
  title,
  body,
  calMethod,
  minBillValue,
  couponValue,
}) {
  const { applyCoupon, isPending } = useApplyCoupon();
  const { data: cartData } = useCart();
  const { setIsCouponApplicable } = useAppContext();

  let totalCartPrice = cartData
    ?.map((item) => item.totalPrice)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  function handleApplyCoupon(e, data) {
    e.stopPropagation();
    if (totalCartPrice >= minBillValue) return applyCoupon(data);
    setIsCouponApplicable((ps) => {
      return {
        ...ps,
        minBillValue: minBillValue,
        isCouponApplicable: false,
      };
    });
  }

  return (
    <div className="border-1 flex items-start justify-between gap-4 rounded-md border-b border-dashed p-5 outline-Grey/50">
      <div>
        <h2 className="text-sm font-medium text-Green">{title}</h2>
        <p className="text-[10px] text-DarkGrey">{body}</p>
      </div>
      <button
        className="flex items-center justify-center gap-1 rounded-sm px-4 py-1 text-[12px] text-DarkGrey outline outline-1 outline-Grey transition-all duration-150 hover:text-Orange hover:outline-Orange"
        disabled={isPending}
        onClick={(e) =>
          handleApplyCoupon(e, { couponValue, calMethod, minBillValue })
        }
      >
        <BiSolidOffer />
        <span className="text-[10px] font-medium">
          {isPending ? "Applying" : "Apply"}
        </span>
      </button>
    </div>
  );
}
