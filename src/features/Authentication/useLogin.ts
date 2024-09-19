import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from "@/services/apiAuth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export type LoginDataType = {
    email: string;
    password: string;
};

export function useLogin() {
    const navigate = useNavigate();

    const {
        mutate: login,
        isPending,
    } = useMutation({
        mutationFn: ({ email, password }: LoginDataType) => loginApi({ email, password }),
        mutationKey: ['user'],
        onSuccess: () => {
            navigate('/');
            toast.success('Login successful', {
                position: 'bottom-right',
            });
        },
        onError: (err) =>
            toast.error(err.message, {
                position: 'bottom-right',
            }),
    });

    return { login, isPending };
}
