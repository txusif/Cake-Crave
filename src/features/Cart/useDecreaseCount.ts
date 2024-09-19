import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decreaseItem as decreaseItemApi, NewItemType } from "@/services/apiCakes";

export function useDecreaseCount() {
  const queryClient = useQueryClient();

  const { mutate: decreaseItem, isPending } = useMutation({
    mutationFn: (item: NewItemType) => decreaseItemApi(item),
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (err) => {
      throw new Error(err.message);
    },
  });

  return { decreaseItem, isPending };
}
