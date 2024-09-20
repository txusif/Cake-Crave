import { useMutation } from '@tanstack/react-query';
import { newOrder as newOrderApi } from "@/services/apiOrders"
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEmptyCart } from './useEmptyCart';
import { CartDataType } from '../Cakes/CakeDetails/CakeCount';

export function useNewOrder() {
    const { emptyCart } = useEmptyCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { mutate: newOrder, isPending } = useMutation({
        mutationFn: (orderDetails: {
            userId: string;
            fullName: string;
            phoneNumber: string;
            address: string;
            cartDetails: { cartItems: CartDataType[] };
        }) => newOrderApi(orderDetails),
        mutationKey: ['orderDetails'],
        onSuccess: (data) => {
            searchParams.set('orderId', data?.[0].orderId);
            setSearchParams(searchParams);
            navigate(data?.[0].orderId);
            toast.success('Your order successfully placed');
            emptyCart();
        },
        onError: (error) => {
            console.log(error);
            toast.error('Error placing your order');
        },
    });
    return { newOrder, isPending };
}
