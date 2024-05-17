import { ROUTES } from '@router/routes';
import { useLoginMutation } from '@src/features/auth/authApi';
import isEmailValid from '@src/lib/isEmailValid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
    const navigate = useNavigate();
    const [login, { isLoading, isError }] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);

    const handleEmailChange =
        () => (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            if (emailTouched && emailInvalid) {
                setEmailInvalid(false);
            }
        };

    const validateEmail = () => {
        setEmailTouched(true);
        if (isEmailValid(email)) {
            setEmailInvalid(false);
            return;
        }
        setEmailInvalid(true);
    };

    const handlePasswordChange =
        () => (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const handleLogin = async () => {
        try {
            await login({
                email,
                password,
                rememberMe,
            }).unwrap();
            navigate(ROUTES.HOME);
        } catch (error) {
            /* empty */
        }
    };

    return {
        email,
        handleEmailChange,
        validateEmail,
        emailInvalid,
        password,
        handlePasswordChange,
        rememberMe,
        toggleRememberMe,
        handleLogin,
        isLoading,
        isError,
    };
}
