import { FaLongArrowAltRight, FaTrash } from "react-icons/fa";
import { MdOutlineRemoveCircle } from "react-icons/md";

import CartTotal from "./CartTotal";
import QuantityButton from "./QuantityButton";
import ApplyCoupon from "./ApplyCoupon";
import CouponDiscount from "./CouponDiscount";

import { useNavigate } from "react-router-dom";
import { useCoupon } from "./useCoupon";
import { useAppContext } from "@/store/AppContext";
import Button from "@/ui/Button";
import { currencyFormatter } from "@/utils/helper";

type AppContextType = {
  handleCheckOut: () => void;
  handleDelete: (id: string) => void;
  setIsCartOpen: (value: boolean) => void;
  isCouponApplicable: {
    isCouponApplicable: boolean;
    minBillValue: number;
  };
  setCartDetails: (value: any) => void;
  handleEmptyCart: () => void;
};

export default function CartItems({ cartData }) {
  const {
    handleCheckOut,
    handleDelete,
    setIsCartOpen,
    isCouponApplicable,
    setCartDetails,
    handleEmptyCart,
  }: AppContextType = useAppContext();
  const { data: couponData, isLoading } = useCoupon();
  const navigate = useNavigate();
  const { isCouponApplicable: isApplicable, minBillValue } = isCouponApplicable;
  const { isCouponApplied, couponValue, calMethod } = couponData?.[0] || [];

  let totalCartPrice = cartData
    ?.map((item) => item.totalPrice)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  let discountPrice = 0;
  let updatedCartPrice = 0;

  if (isCouponApplied) {
    discountPrice =
      calMethod === "percentage"
        ? Math.ceil((totalCartPrice * couponValue) / 100)
        : couponValue;
    updatedCartPrice = totalCartPrice - discountPrice;
  } else {
    totalCartPrice = cartData
      ?.map((item) => item.totalPrice)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);
  }

  let cartDetails = {
    cartItems: cartData?.map((meal) => meal),
  };

  cartDetails = {
    ...cartDetails,
    discountPrice,
    totalCartPrice,
    updatedCartPrice,
    isCouponApplied,
  };

  function handleClickCheckOut(e) {
    e.stopPropagation();
    handleCheckOut();
    navigate("/order");
    setIsCartOpen(false);
    setCartDetails(cartDetails);
  }

  function handleClickRemoveCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    handleEmptyCart();
  }

  return (
    <>
      <div
        className="flex w-full cursor-default flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {cartData?.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-md border border-Grey/30 p-2"
            >
              <div className="flex flex-col gap-1">
                <span className="w-[100px] text-xs font-bold capitalize">
                  {item.name}
                </span>
                <div className="flex items-start justify-start gap-[2px] text-Grey">
                  <span className="text-[9px]">₹</span>
                  <span className="text-xs font-medium">{item.price}</span>
                </div>
              </div>
              <QuantityButton item={item} />
              <div className="flex items-center gap-1">
                <div className="flex w-[60px] justify-end gap-[2px] text-Grey">
                  <span className="mt-1 text-xs text-Orange">₹</span>
                  <span className="font-bold text-DarkGrey">
                    {currencyFormatter(item.totalPrice)}
                  </span>
                </div>
                <MdOutlineRemoveCircle
                  className="cursor-pointer text-Orange"
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full flex-col gap-4">
        {couponData?.[0]?.isCouponApplied !== true && <ApplyCoupon />}
        {couponData?.[0]?.isCouponApplied && <CouponDiscount />}
        {!isApplicable && minBillValue !== undefined && (
          <p className="text-xs text-Red">{`Coupon only applicable for cart value above ₹${minBillValue}`}</p>
        )}
      </div>
      <CartTotal
        isCouponApplied={isCouponApplied}
        discountPrice={discountPrice}
        totalCartPrice={totalCartPrice}
        updatedCartPrice={updatedCartPrice}
      />
      <div className="flex w-full flex-col justify-center gap-4">
        <Button
          type="checkout"
          onClick={(e) => handleClickCheckOut(e)}
          disabled={isLoading}
        >
          Checkout
          <FaLongArrowAltRight />
        </Button>
        <Button
          type="clear"
          onClick={(e) => handleClickRemoveCart(e)}
          disabled={isLoading}
        >
          Clear
          <FaTrash className="mb-1 text-xs" />
        </Button>
      </div>
    </>
  );
}
