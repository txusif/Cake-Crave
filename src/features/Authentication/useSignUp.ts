import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SignUpDataType } from './SignUp';

export default function useSignUp() {
    const navigate = useNavigate();
    const { mutate: signUp, isPending } = useMutation({
        mutationFn: ({ fullName, email, password }: SignUpDataType) =>
            signUpApi({ fullName, email, password }),
        onSuccess: () => {
            navigate('/login');
            toast.success('Account created successfully', {
                position: 'bottom-right',
            });
        },
        onError: (err) =>
            toast.error(err.message, {
                position: 'bottom-right',
            }),
    });

    return { signUp, isPending };
}
