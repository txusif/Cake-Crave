import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem as deleteItemApi } from "@/services/apiCakes";

export function useDeleteItem() {
  const queryClient = useQueryClient();

  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: (id: number) => deleteItemApi(id),
    mutationKey: ['cart'],
    onSuccess: () => {
      toast.success('Item removed from cart');
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError: () => toast.error("Couldn't remove item from the cart"),
  });

  return { deleteItem, isPending };
}
