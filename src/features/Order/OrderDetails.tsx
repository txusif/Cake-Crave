import { useParams } from "react-router-dom";

import Order from "./Order";
import LoadingScreen from "@/ui/LoadingScreen";
import CusDetails from "./CusDetails";
import { orderPlaced } from "@/utils/GlobalConst";
import { useGetOrder } from "./useGetOrder";

export default function OrderDetails() {
  const { orderId } = useParams();
  const { data, isLoading } = useGetOrder(orderId || "");
  const currentOrder = data?.[0];

  if (isLoading) return <LoadingScreen />;

  const {
    orderId: id,
    fullName,
    phoneNumber,
    address,
    cartDetails: {
      cartItems,
      discountPrice,
      totalCartPrice,
      updatedCartPrice,
      isCouponApplied,
    },
  } = currentOrder;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-4 sm:p-10">
      <div className="h-[60px] sm:h-[80px] md:h-[100px]"></div>
      <div className="flex flex-col items-center gap-3">
        <div className="h-auto w-[200px]">
          <img className="w-auto" src={orderPlaced} alt="order placed" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-extrabold uppercase tracking-tight text-DarkGrey">
            Yay! We have received your order
          </h1>
          <p className="text-base text-Grey">
            Your order will be devlivered soon...
          </p>
        </div>
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-6">
        <Order
          id={id}
          cartItems={cartItems}
          discountPrice={discountPrice}
          totalCartPrice={totalCartPrice}
          updatedCartPrice={updatedCartPrice}
          isCouponApplied={isCouponApplied}
        />
        <CusDetails
          fullName={fullName}
          phoneNumber={phoneNumber}
          address={address}
        />
      </div>
    </div>
  );
}
