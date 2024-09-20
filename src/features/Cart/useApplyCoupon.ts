import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyCoupon as applyCouponApi, CouponType } from "@/services/apiCakes"
import { useAppContext } from '@/store/AppContext';

export function useApplyCoupon() {
  const { setCoupon, setIsCouponApplicable } = useAppContext();

  const queryClient = useQueryClient();
  const { mutate: applyCoupon, isPending } = useMutation({
    mutationFn: (coupon: CouponType) => applyCouponApi(coupon),
    mutationKey: ['coupon'],
    onSuccess: () => {
      setCoupon(false);
      setIsCouponApplicable({
        minBillValue: 0,
        isCouponApplicable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['coupon'] });
      toast.success('Coupon applied');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { applyCoupon, isPending };
}
