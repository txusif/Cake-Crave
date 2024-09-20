import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeItem as removeItemApi } from "@/services/apiCakes";

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  const { mutate: removeItem, isPending } = useMutation({
    mutationFn: (id: number) => removeItemApi(id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Removed from the cart');
    },
    onError: (err) => alert(err.message),
  });

  return { removeItem, isPending };
}
