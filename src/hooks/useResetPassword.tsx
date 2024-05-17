import {
    useResetPasswordMutation,
    useVerifyTokenMutation,
} from '@src/features/auth/authApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function useResetPassword() {
    const { token } = useParams();
    const [
        verifyToken,
        { isUninitialized, isLoading: validating, isSuccess: isValidToken },
    ] = useVerifyTokenMutation();

    const [password, setPassword] = useState('');
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [passwordInvalidLength, setPasswordInvalidLength] = useState(false);
    const [
        passwordInvalidSpecialCharacters,
        setPasswordInvalidSpecialCharacters,
    ] = useState(false);
    const [passwordInvalidNumber, setPasswordInvalidNumber] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false);

    const [resetPassword, { isError: isServerError, isLoading, isSuccess }] =
        useResetPasswordMutation();

    const [clientError, setClientError] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (token && isUninitialized) verifyToken(token);
        }, 1000);
    }, [token, isUninitialized, verifyToken]);

    const handlePasswordChange =
        () => (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            setPassword(input);
            if (passwordTouched) {
                validatePassword(input);
            }
        };

    const validatePassword = (input: string) => {
        setPasswordTouched(true);
        validatePasswordLength(input);
        validatePasswordSpecialCharacters(input);
        validatePasswordNumber(input);

        return undefined;
    };

    const validatePasswordLength = (input: string) => {
        setPasswordInvalidLength(input.length < 12);
    };

    const validatePasswordSpecialCharacters = (input: string) => {
        if (!input.match(/[!@#$%^&*(),.?":{}|<>]/)) {
            setPasswordInvalidSpecialCharacters(true);
        } else {
            setPasswordInvalidSpecialCharacters(false);
        }
    };

    const validatePasswordNumber = (input: string) => {
        if (!input.match(/\d/)) {
            setPasswordInvalidNumber(true);
        } else {
            setPasswordInvalidNumber(false);
        }
    };

    const handleConfirmPasswordChange =
        () => (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            setConfirmPassword(input);
            if (confirmPasswordTouched) {
                validateConfirmPassword(input);
            }
        };

    const validateConfirmPassword = (input: string) => {
        setConfirmPasswordTouched(true);
        if (input === '' || input !== password) {
            setConfirmPasswordInvalid(true);
        } else {
            setConfirmPasswordInvalid(false);
        }
    };

    const validateForm = () => {
        if (!password || !confirmPassword) {
            return false;
        }

        validatePassword(password);
        validateConfirmPassword(confirmPassword);

        if (
            passwordInvalidLength ||
            passwordInvalidSpecialCharacters ||
            passwordInvalidNumber ||
            confirmPasswordInvalid
        ) {
            return false;
        }

        return true;
    };

    const handleResetPassword = () => {
        const isFormValid = validateForm();
        if (!token || !isFormValid) {
            setClientError(true);
            return;
        }
        resetPassword({
            password,
            verificationToken: token,
        });
    };

    return {
        isValidToken,
        isVerifying: isUninitialized || validating,
        password,
        validatePassword,
        passwordInvalidLength,
        passwordInvalidSpecialCharacters,
        passwordInvalidNumber,
        confirmPassword,
        validateConfirmPassword,
        confirmPasswordInvalid,
        handlePasswordChange,
        handleConfirmPasswordChange,
        isLoading,
        isClientError: clientError,
        isServerError,
        handleResetPassword,
        resetPasswordSuccess: isSuccess,
    };
}

export default useResetPassword;
