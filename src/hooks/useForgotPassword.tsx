import { useForgotPasswordMutation } from '@src/features/auth/authApi';
import isEmailValid from '@src/lib/isEmailValid';
import { useState } from 'react';

function useForgotPassword({ onSuccess }: { onSuccess: () => void }) {
    const [forgotPassword, { isLoading, isError }] =
        useForgotPasswordMutation();
    const [email, setEmail] = useState('');
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

    const handleForgotPassword = async () => {
        try {
            await forgotPassword({
                email,
            }).unwrap();
            onSuccess();
        } catch (error) {
            /* empty */
        }
    };

    return {
        email,
        handleEmailChange,
        validateEmail,
        emailInvalid,
        isLoading,
        isError,
        handleForgotPassword,
    };
}

export default useForgotPassword;
