import { getCart } from "@/services/apiCakes";
import { useQuery } from "@tanstack/react-query";

export function useCart() {
  const { data, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  return { data, isPending };
}
