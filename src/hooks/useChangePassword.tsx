import { useChangePasswordMutation } from '@src/features/auth/authApi';
import React, { useState } from 'react';

function useChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordTouched, setCurrentPasswordTouched] = useState(false);
    const [currentPasswordInvalid, setCurrentPasswordInvalid] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordTouched, setNewPasswordTouched] = useState(false);
    const [passwordInvalidLength, setPasswordInvalidLength] = useState(false);
    const [
        passwordInvalidSpecialCharacters,
        setPasswordInvalidSpecialCharacters,
    ] = useState(false);
    const [passwordInvalidNumber, setPasswordInvalidNumber] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false);

    const [clientError, setClientError] = useState(false);
    const [changePassword, { isLoading, isError }] =
        useChangePasswordMutation();

    const handleCurrentPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const input = e.target.value;
        setCurrentPassword(input);
        if (currentPasswordTouched) {
            validateCurrentPassword(input);
        }
    };

    const validateCurrentPassword = (input: string) => {
        setCurrentPasswordTouched(true);
        if (input === '') {
            setCurrentPasswordInvalid(true);
        } else {
            setCurrentPasswordInvalid(false);
        }
    };

    const handleNewPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const input = e.target.value;
        setNewPassword(input);
        if (newPasswordTouched) {
            validateNewPassword(input);
        }
    };

    const validateNewPassword = (input: string) => {
        setNewPasswordTouched(true);
        if (input.length < 12) {
            setPasswordInvalidLength(true);
        } else {
            setPasswordInvalidLength(false);
        }
        if (!/[^a-zA-Z0-9]/.test(input)) {
            setPasswordInvalidSpecialCharacters(true);
        } else {
            setPasswordInvalidSpecialCharacters(false);
        }
        if (!/\d/.test(input)) {
            setPasswordInvalidNumber(true);
        } else {
            setPasswordInvalidNumber(false);
        }
    };

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const input = e.target.value;
        setConfirmPassword(input);
        if (confirmPasswordTouched) {
            validateConfirmPassword(input);
        }
    };

    const validateConfirmPassword = (input: string) => {
        setConfirmPasswordTouched(true);
        if (!input || input === '' || input !== newPassword) {
            setConfirmPasswordInvalid(true);
        } else {
            setConfirmPasswordInvalid(false);
        }
    };

    const validateForm = () => {
        setClientError(false);

        validateCurrentPassword(currentPassword);
        validateNewPassword(newPassword);
        validateConfirmPassword(confirmPassword);

        return (
            !currentPasswordInvalid ||
            !passwordInvalidLength ||
            !passwordInvalidSpecialCharacters ||
            !passwordInvalidNumber ||
            !confirmPasswordInvalid
        );
    };

    const handleChangePassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const isFormTouched =
            currentPasswordTouched ||
            newPasswordTouched ||
            confirmPasswordTouched;
        const isFormValid = validateForm();
        if (!isFormTouched || !isFormValid) {
            setClientError(true);
            return;
        }
        try {
            await changePassword({
                currentPassword,
                newPassword,
            }).unwrap();
        } catch (e) {
            // handled elsewhere
        }
    };

    return {
        currentPassword,
        currentPasswordInvalid,
        handleCurrentPasswordChange,
        validateCurrentPassword,
        newPassword,
        passwordInvalidLength,
        passwordInvalidSpecialCharacters,
        passwordInvalidNumber,
        handleNewPasswordChange,
        validateNewPassword,
        confirmPassword,
        confirmPasswordInvalid,
        validateConfirmPassword,
        handleConfirmPasswordChange,
        handleChangePassword,
        isLoading,
        isClientError: clientError,
        isServerError: isError,
    };
}

export default useChangePassword;
