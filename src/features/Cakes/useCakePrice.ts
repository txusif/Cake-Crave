import { getCakesRaw } from '@/services/apiCakes';
import { useQuery } from '@tanstack/react-query';

export function useCakePrice() {
    const { data: cakeItems, isLoading } = useQuery({
        queryKey: ['cakeItems'],
        queryFn: getCakesRaw
    });

    let cakePriceList: number[] = [];
    cakeItems?.map((i) => cakePriceList.push(Math.ceil(Number(i.price))));

    return { cakePriceList, isLoading };
}
