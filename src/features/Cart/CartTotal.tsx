import { currencyFormatter } from "@/utils/helper";

type CartTotalProps = {
  isCouponApplied: boolean;
  discountPrice: number;
  totalCartPrice: number;
  updatedCartPrice: number;
};

export default function CartTotal({
  isCouponApplied,
  discountPrice,
  totalCartPrice,
  updatedCartPrice,
}: CartTotalProps) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md bg-LightGrey/60 p-4">
      {isCouponApplied && (
        <div>
          <div className="flex items-center justify-between text-sm text-Grey">
            Coupon discounts:
            <div>
              <span className="font-medium text-MediumGrey">
                {totalCartPrice}{" "}
              </span>
              <span className="font-medium text-Green">
                {` - ${discountPrice}`}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-MediumGrey">
          Total Amount:
        </span>

        <div className="flex gap-1">
          <span className="font-semibold text-Orange">₹</span>
          <span className="text-xl font-bold text-Black">
            {currencyFormatter(updatedCartPrice || totalCartPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
