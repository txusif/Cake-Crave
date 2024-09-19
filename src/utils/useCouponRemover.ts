import { useCart } from "@/features/Cart/useCart";
import { useCoupon } from "@/features/Cart/useCoupon";
import { useRemoveCoupon } from "@/features/Cart/useRemoveCoupon";
import { useEffect } from "react";

export function useCouponRemover() {
    const { removeCoupon } = useRemoveCoupon();
    const { data } = useCoupon();
    const { data: cartData } = useCart();
    const minBillValue = data?.[0]?.minBillValue;
    const isCouponApplied = data?.[0]?.isCouponApplied;

    useEffect(() => {
        if (cartData) {
            const totalCartPrice = cartData
                ?.map((item) => item.totalPrice)
                .reduce((acc, cur) => {
                    return acc + cur;
                }, 0);
            if (
                totalCartPrice < minBillValue ||
                (!totalCartPrice && isCouponApplied)
            ) {
                removeCoupon();
            }
        }
    }, [cartData, removeCoupon, minBillValue, isCouponApplied]);
    return;
}
