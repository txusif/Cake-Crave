import { getOrder } from '@/services/apiOrders';
import { useQuery } from '@tanstack/react-query';

export function useGetOrder(orderId: string) {
    const { data, isLoading, error } = useQuery({
        queryFn: () => getOrder(orderId),
        queryKey: ['orderDetails'],
    });

    if (error) console.log(error);
    return { data, isLoading };
}
