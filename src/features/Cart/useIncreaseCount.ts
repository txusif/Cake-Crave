import { useMutation, useQueryClient } from '@tanstack/react-query';
import { increaseItem as increaseItemApi, NewItemType } from "@/services/apiCakes";

export function useIncreaseCount() {
  const queryClient = useQueryClient();

  const { mutate: increaseItem, isPending } = useMutation({
    mutationFn: (item: NewItemType) => increaseItemApi(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      throw new Error(err.message);
    },
  });

  return { increaseItem, isPending };
}
