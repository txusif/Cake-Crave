import { currencyFormatter } from "@/utils/helper";
import { Navigate } from "react-router-dom";
import { CartDataType } from "../Cakes/CakeDetails/CakeCount";

type OrderProps = {
  cartItems: CartDataType[];
  isCouponApplied: boolean;
  totalCartPrice: number;
  discountPrice: number;
  updatedCartPrice: number;
  id: string;
};

export default function Order({
  cartItems,
  isCouponApplied,
  totalCartPrice,
  discountPrice,
  updatedCartPrice,
  id,
}: OrderProps) {
  if (!cartItems) return <Navigate to={"/"} />;

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6">
      <h2 className="text-center text-xl font-bold uppercase text-Green">
        order details
      </h2>
      <div className="flex w-full flex-col gap-2 text-sm capitalize text-Grey">
        <p className="text-xs font-medium text-Black">
          Order ID:{" "}
          <span className="font-semibold uppercase text-Red">
            #{id?.split("-")[0]}
          </span>
        </p>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between gap-12">
            <div className="flex flex-col">
              <div className="space-x-2 text-sm font-semibold text-DarkGrey">
                <span>{item.name}</span>
                <span className="text-MediumGrey">X {item.quantity}</span>
              </div>
              <span className="max-w-[300px] text-xs font-light text-Grey">
                {item.ingredients}
              </span>
            </div>

            {item.quantity > 1 ? (
              <div className="flex items-center gap-2">
                <span className=" ">
                  {currencyFormatter(item.price)} X {item.quantity} =
                </span>
                <span className="font-semibold text-MediumGrey">
                  {currencyFormatter(item.totalPrice)}
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-MediumGrey">
                  {"₹ " + currencyFormatter(item.price)}
                </span>
              </div>
            )}
          </div>
        ))}
        {isCouponApplied && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Coupon Discount: </p>
              <div className="flex gap-2">
                <span>{currencyFormatter(totalCartPrice)}</span>
                {" - "}
                <span className="font-semibold text-Green">
                  {currencyFormatter(discountPrice)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p>Total Amount:</p>{" "}
              <span className="text-lg font-bold text-Orange">
                {currencyFormatter(updatedCartPrice)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
