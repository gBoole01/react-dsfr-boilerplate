import { selectCurrentUser } from '@src/features/auth/authSlice';
import { useUpdateUserByIdMutation } from '@src/features/user/userApi';
import isPhoneValid from '@src/lib/isPhoneValid';
import { useAppSelector } from '@src/store/hooks';
import React, { useState } from 'react';

function useEditUserInfo() {
    const currentUser = useAppSelector(selectCurrentUser);

    const [gender, setGender] = useState(currentUser?.gender ?? 'M');
    const [genderTouched, setGenderTouched] = useState(false);
    const [genderInvalid, setGenderInvalid] = useState(false);

    const [phone, setPhone] = useState(currentUser?.phone ?? '');
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [phoneInvalid, setPhoneInvalid] = useState(false);

    const [username, setUsername] = useState(currentUser?.username ?? '');
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [usernameInvalid, setUsernameInvalid] = useState(false);

    const [firstName, setfirstName] = useState(currentUser?.firstName ?? '');
    const [firstNameTouched, setfirstNameTouched] = useState(false);
    const [firstNameInvalid, setfirstNameInvalid] = useState(false);

    const [profession, setProfession] = useState(currentUser?.profession ?? '');
    const [professionTouched, setProfessionTouched] = useState(false);
    const [professionInvalid, setProfessionInvalid] = useState(false);

    const [address, setAddress] = useState(currentUser?.address ?? '');
    const [addressTouched, setAddressTouched] = useState(false);
    const [addressInvalid, setAddressInvalid] = useState(false);

    const [postalCode, setPostalCode] = useState(currentUser?.postalCode ?? '');
    const [postalCodeTouched, setPostalCodeTouched] = useState(false);
    const [postalCodeInvalid, setPostalCodeInvalid] = useState(false);

    const [commune, setCommune] = useState(currentUser?.commune ?? '');
    const [communeTouched, setCommuneTouched] = useState(false);
    const [communeInvalid, setCommuneInvalid] = useState(false);

    const [lastName, setlastName] = useState(currentUser?.lastName ?? '');
    const [lastNameTouched, setlastNameTouched] = useState(false);
    const [lastNameInvalid, setlastNameInvalid] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [clientError, setClientError] = useState(false);
    const [updateUserById, { isLoading, isError }] =
        useUpdateUserByIdMutation();

    const toggleEditingMode = () => {
        setIsEditing(!isEditing);
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const input = e.target.value;
        setGender(input);
        if (genderTouched) {
            validateGender(input);
        }
    };

    const validateGender = (input: string) => {
        setGenderTouched(true);
        if (input !== 'M' && input !== 'F') {
            setGenderInvalid(true);
        } else {
            setGenderInvalid(false);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setPhone(input);
        if (phoneTouched) {
            validatePhone(input);
        }
    };

    const validatePhone = (input: string) => {
        setPhoneTouched(true);
        if (isPhoneValid(input)) {
            setPhoneInvalid(false);
        } else {
            setPhoneInvalid(true);
        }
    };

    const handlefirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setfirstName(input);
        if (firstNameTouched) {
            validatefirstName(input);
        }
    };

    const validatefirstName = (input: string) => {
        setfirstNameTouched(true);
        if (!input || input === '') {
            setfirstNameInvalid(true);
        } else {
            setfirstNameInvalid(false);
        }
    };

    const handlelastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setlastName(input);
        if (lastNameTouched) {
            validatelastName(input);
        }
    };

    const validatelastName = (input: string) => {
        setlastNameTouched(true);
        if (!input || input === '') {
            setlastNameInvalid(true);
        } else {
            setlastNameInvalid(false);
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setUsername(input);
        if (usernameTouched) {
            validateUsername(input);
        }
    };

    const validateUsername = (input: string) => {
        setUsernameTouched(true);
        if (!input || input === '') {
            setUsernameInvalid(true);
        } else {
            setUsernameInvalid(false);
        }
    };

    const handleCommuneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setCommune(input);
        if (communeTouched) {
            validateCommune(input);
        }
    };

    const validateCommune = (input: string) => {
        setCommuneTouched(true);
        if (!input || input === '') {
            setCommuneInvalid(true);
        } else {
            setCommuneInvalid(false);
        }
    };

    const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setPostalCode(input);
        if (postalCodeTouched) {
            validatePostalCode(input);
        }
    };

    const validatePostalCode = (input: string) => {
        setPostalCodeTouched(true);
        if (!input || input === '') {
            setPostalCodeInvalid(true);
        } else {
            setPostalCodeInvalid(false);
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setAddress(input);
        if (addressTouched) {
            validateAddress(input);
        }
    };

    const validateAddress = (input: string) => {
        setAddressTouched(true);
        if (!input || input === '') {
            setAddressInvalid(true);
        } else {
            setAddressInvalid(false);
        }
    };

    const handleProfessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setProfession(input);
        if (professionTouched) {
            validateProfession(input);
        }
    };

    const validateProfession = (input: string) => {
        setProfessionTouched(true);
        if (!input || input === '') {
            setProfessionInvalid(true);
        } else {
            setProfessionInvalid(false);
        }
    };

    const validateForm = () => {
        setClientError(false);

        validateGender(gender);
        validatePhone(phone);
        validateUsername(username);
        validateCommune(commune);
        validatePostalCode(postalCode);
        validateAddress(address);
        validateProfession(profession);
        validatefirstName(firstName);
        validatelastName(lastName);

        return (
            !genderInvalid &&
            !phoneInvalid &&
            !usernameInvalid &&
            !communeInvalid &&
            !postalCodeInvalid &&
            !addressInvalid &&
            !professionInvalid &&
            !firstNameInvalid &&
            !lastNameInvalid
        );
    };

    const handleEditProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (!isFormValid) {
            setClientError(true);
            return;
        }
        try {
            if (!currentUser?.id) return;
            await updateUserById({
                ...currentUser,
                gender,
                phone,
                commune,
                postalCode,
                address,
                profession,
                username,
                firstName,
                lastName,
            }).unwrap();
            setIsEditing(false);
        } catch (error) {
            // not handled there
        }
    };

    return {
        email: currentUser?.email ?? '',
        birthdate: currentUser?.birthdate ?? '',
        gender,
        genderInvalid,
        validateGender,
        handleGenderChange,
        phone,
        phoneInvalid,
        validatePhone,
        handlePhoneChange,
        username,
        usernameInvalid,
        validateUsername,
        handleUsernameChange,
        firstName,
        firstNameInvalid,
        validatefirstName,
        handlefirstNameChange,
        lastName,
        lastNameInvalid,
        validatelastName,
        handlelastNameChange,
        commune,
        communeInvalid,
        validateCommune,
        handleCommuneChange,
        postalCode,
        postalCodeInvalid,
        validatePostalCode,
        handlePostalCodeChange,
        address,
        addressInvalid,
        validateAddress,
        handleAddressChange,
        profession,
        professionInvalid,
        validateProfession,
        handleProfessionChange,
        isEditing,
        toggleEditingMode,
        handleEditProfile,
        isClientError: clientError,
        isLoading,
        isServerError: isError,
    };
}

export default useEditUserInfo;
