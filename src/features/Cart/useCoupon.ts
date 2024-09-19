import { useQuery } from '@tanstack/react-query';
import { getCoupon } from "@/services/apiCakes";

export function useCoupon() {
  const { data, isLoading } = useQuery({
    queryKey: ['coupon'],
    queryFn: getCoupon,
  });

  return { data, isLoading };
}
