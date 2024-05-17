import { useRegisterMutation } from '@src/features/auth/authApi';
import getAge from '@src/lib/getAge';
import isEmailValid from '@src/lib/isEmailValid';
import { ROUTES } from '@src/router/routes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useRegister() {
    const navigate = useNavigate();
    const [register, { isLoading, isError }] = useRegisterMutation();

    const [email, setEmail] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);

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

    const [birthdate, setBirthdate] = useState('');
    const [birthdateTouched, setBirthdateTouched] = useState(false);
    const [birthdateInvalid, setBirthdateInvalid] = useState(false);

    const [consentAccepted, setConsentAccepted] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setConsentTouched] = useState(false);
    const [consentInvalid, setConsentInvalid] = useState(false);

    const [clientError, setClientError] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setEmail(input);
        if (emailTouched) {
            validateEmail(input);
        }
    };

    const validateEmail = (input: string) => {
        setEmailTouched(true);
        if (isEmailValid(input)) {
            setEmailInvalid(false);
        } else {
            setEmailInvalid(true);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (input === '' || input !== password) {
            setConfirmPasswordInvalid(true);
        } else {
            setConfirmPasswordInvalid(false);
        }
    };

    const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setBirthdate(input);
        if (birthdateTouched) {
            validateBirthdate(input);
        }
    };

    const validateBirthdate = (input: string) => {
        setBirthdateTouched(true);

        if (input === '' || getAge(input) < 16) {
            setBirthdateInvalid(true);
        } else {
            setBirthdateInvalid(false);
        }
    };

    const toggleConsent = () => {
        setConsentAccepted(!consentAccepted);
        if (consentAccepted) {
            setConsentInvalid(true);
        } else {
            setConsentInvalid(false);
        }
    };

    const handleConsentBlur = () => {
        setConsentTouched(true);
        if (!consentAccepted) setConsentInvalid(true);
    };

    const validateForm = () => {
        validateEmail(email);
        validatePassword(password);
        validateConfirmPassword(confirmPassword);
        validateBirthdate(birthdate);
        if (!consentAccepted) setConsentInvalid(true);

        return (
            !emailInvalid &&
            !passwordInvalidLength &&
            !passwordInvalidSpecialCharacters &&
            !passwordInvalidNumber &&
            !confirmPasswordInvalid &&
            !birthdateInvalid &&
            !consentInvalid
        );
    };

    const handleRegister = async () => {
        const isFormTouched =
            emailTouched &&
            passwordTouched &&
            confirmPasswordTouched &&
            birthdateTouched;
        const isFormValid = validateForm();

        if (!isFormTouched || !isFormValid) {
            setClientError(true);
            return;
        }
        try {
            await register({
                email,
                password,
                birthdate: new Date(birthdate).valueOf() / 1000,
            }).unwrap();
            navigate(ROUTES.REGISTER_SUCCESS);
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
        validatePassword,
        passwordInvalidLength,
        passwordInvalidSpecialCharacters,
        passwordInvalidNumber,
        confirmPassword,
        handleConfirmPasswordChange,
        validateConfirmPassword,
        confirmPasswordInvalid,
        birthdate,
        handleBirthdateChange,
        validateBirthdate,
        birthdateInvalid,
        consentAccepted,
        toggleConsent,
        handleConsentBlur,
        consentInvalid,
        isLoading,
        isClientError: clientError,
        isServerError: isError,
        handleRegister,
    };
}

export default useRegister;
