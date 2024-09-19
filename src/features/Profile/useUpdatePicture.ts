import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updatePicture as updatePictureApi } from '@/services/apiAuth';
import { useAppContext } from '@/store/AppContext';

export function useUpdatePicture() {
    const { setProfile }: {
        setProfile: React.Dispatch<React.SetStateAction<string | null>>;
    } = useAppContext();
    const queryClient = useQueryClient();
    const { mutate: updatePicture, isPending } = useMutation({
        mutationFn: (avatar: File) => updatePictureApi(avatar),
        onSuccess: ({ user }) => {
            queryClient.setQueryData(['user'], user);
            toast.success('Profile picture updated');
            setProfile(null);
        },
        onError: () => toast.error('Please upload an image'),
    });
    return { updatePicture, isPending };
}
