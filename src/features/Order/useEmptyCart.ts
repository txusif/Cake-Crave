import { useMutation, useQueryClient } from '@tanstack/react-query';
import { emptyCart as emptyCartApi } from "@/services/apiCakes";
import { useRemoveCoupon } from '../Cart/useRemoveCoupon';
import { useCoupon } from '../Cart/useCoupon';


type CouponType = {
    calMethod: string;
    couponValue: number;
    created_at: string;
    id: number;
    isCouponApplied: boolean;
    minBillValue: number;
}

export function useEmptyCart() {
    const queryClient = useQueryClient();
    const { data }: {
        data: CouponType[] | undefined;
    } = useCoupon();

    const { removeCoupon } = useRemoveCoupon();
    const { mutate: emptyCart, isPending } = useMutation({
        mutationFn: emptyCartApi,
        mutationKey: ['cart'],
        onSuccess: () => {
            if (data && data.some(coupon => coupon.isCouponApplied)) removeCoupon();
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (err) => {
            console.log(err);
        },
    });
    return { emptyCart, isPending };
}
