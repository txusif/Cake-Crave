import { useAppContext } from '@/store/AppContext';
import { placeHolderImage } from '@/utils/GlobalConst';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removePicture as removePictureApi } from '@/services/apiAuth';

import { toast } from 'sonner';

export function useRemovePicture() {
    const queryClient = useQueryClient();
    const { setAvatar }: {
        setAvatar: React.Dispatch<React.SetStateAction<string>>;
    }
        = useAppContext();
    const { mutate: removePicture, isPending } = useMutation({
        mutationFn: removePictureApi,
        onSuccess: ({ user }) => {
            setAvatar(placeHolderImage);
            queryClient.setQueryData(['user'], user);
            toast.success('Profile picture removed');
        },
        onError: () => toast.error('Profile picture cannot be removed'),
    });
    return { removePicture, isPending };
}
