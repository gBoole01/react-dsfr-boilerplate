import Alert from '@codegouvfr/react-dsfr/Alert';
import Button from '@codegouvfr/react-dsfr/Button';
import Input from '@codegouvfr/react-dsfr/Input';
import { Select } from '@codegouvfr/react-dsfr/Select';
import { Box } from '@mui/material';
import useEditUserInfo from '@src/hooks/useEditUserInfo';

function InfoSection() {
    const {
        email,
        birthdate,
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
        isClientError,
        isLoading,
        isServerError,
    } = useEditUserInfo();

    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'flex-end',
            }}
            data-testid="info-section"
        >
            {(isClientError || isServerError) && (
                <Alert
                    data-testid={
                        isClientError
                            ? 'edit-profile-client-error-alert'
                            : isServerError
                            ? 'edit-profile-server-error-alert'
                            : ''
                    }
                    small
                    severity="error"
                    title="Une erreur est survenue"
                    description={
                        isClientError
                            ? 'Veuillez vérifier les informations saisies.'
                            : isServerError
                            ? 'Merci de réessayer ultérieurement. Veuillez nous excuser pour la gêne occasionnée.'
                            : ''
                    }
                />
            )}

            {!isEditing && (
                <Button
                    data-testid="edit-info-button-0"
                    iconId="fr-icon-edit-box-line"
                    title="Modifier"
                    onClick={toggleEditingMode}
                >
                    Modifier
                </Button>
            )}
            {isEditing && (
                <Button
                    data-testid="cancel-edit-info-button"
                    priority="secondary"
                    onClick={toggleEditingMode}
                >
                    Annuler
                </Button>
            )}
            <Box
                component="form"
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    alignItems: 'stretch',
                }}
                data-testid="edit-profile-form"
                onSubmit={(e) => handleEditProfile(e)}
            >
                <Input
                    disabled
                    data-testid="email-input"
                    label="Adresse email"
                    nativeInputProps={{
                        type: 'email',
                        value: email,
                    }}
                />
                <Input
                    disabled
                    data-testid="birthdate-input"
                    label="Date de naissance"
                    nativeInputProps={{
                        type: 'date',
                        placeholder: 'JJ/MM/AAAA',
                        value: birthdate,
                    }}
                />
                <Input
                    disabled={!isEditing}
                    data-testid="username-input"
                    label="Nom d'utilisateur"
                    state={usernameInvalid ? 'error' : 'default'}
                    stateRelatedMessage="Veuillez saisir un nom d'utilisateur"
                    nativeInputProps={{
                        value: username,
                        onChange: handleUsernameChange,
                        onBlur: (e) => validateUsername(e.target.value),
                        'aria-invalid': usernameInvalid,
                    }}
                />
                <Select
                    disabled={!isEditing}
                    data-testid="gender-select"
                    label="Civilité"
                    nativeSelectProps={{
                        value: gender,
                        onChange: handleGenderChange,
                        onBlur: (e) => validateGender(e.target.value),
                    }}
                    state={genderInvalid ? 'error' : 'default'}
                    stateRelatedMessage={
                        genderInvalid
                            ? 'Veuillez sélectionner une civilité'
                            : undefined
                    }
                >
                    <option value="M">M</option>
                    <option value="F">Mme</option>
                </Select>
                <Input
                    disabled={!isEditing}
                    data-testid="firstname-input"
                    label="Prénom"
                    nativeInputProps={{
                        value: firstName,
                        onChange: handlefirstNameChange,
                        onBlur: (e) => validatefirstName(e.target.value),
                    }}
                    state={firstNameInvalid ? 'error' : 'default'}
                    stateRelatedMessage={
                        firstNameInvalid
                            ? 'Veuillez saisir un prénom'
                            : undefined
                    }
                />
                <Input
                    disabled={!isEditing}
                    data-testid="lastname-input"
                    label="Nom"
                    nativeInputProps={{
                        value: lastName,
                        onChange: handlelastNameChange,
                        onBlur: (e) => validatelastName(e.target.value),
                    }}
                    state={lastNameInvalid ? 'error' : 'default'}
                    stateRelatedMessage={
                        lastNameInvalid ? 'Veuillez saisir un nom' : undefined
                    }
                />
                <Input
                    disabled={!isEditing}
                    data-testid="phone-input"
                    hintText="Format : 06XXXXXXXX"
                    label="Numéro de téléphone"
                    nativeInputProps={{
                        value: phone,
                        onChange: handlePhoneChange,
                        onBlur: (e) => validatePhone(e.target.value),
                    }}
                    state={phoneInvalid ? 'error' : 'default'}
                    stateRelatedMessage={
                        phoneInvalid
                            ? 'Veuillez renseigner un numéro de téléphone valide'
                            : undefined
                    }
                />
                <Input
                    disabled={!isEditing}
                    data-testid="address-input"
                    label="Adresse postale"
                    nativeInputProps={{
                        value: address,
                        onChange: handleAddressChange,
                        onBlur: (e) => validateAddress(e.target.value),
                    }}
                    state={addressInvalid ? 'error' : 'default'}
                    stateRelatedMessage={
                        addressInvalid
                            ? 'Veuillez saisir une adresse'
                            : undefined
                    }
                />
                <Input
                    disabled={!isEditing}
                    data-testid="postal-code-input"
                    label="Code postal"
                    nativeInputProps={{
                        value: postalCode,
                        onChange: handlePostalCodeChange,
                        onBlur: (e) => validatePostalCode(e.target.value),
                    }}
                    state={postalCodeInvalid ? 'error' : 'default'}
                    stateRelatedMessage={
                        postalCodeInvalid
                            ? 'Veuillez saisir un code postal'
                            : undefined
                    }
                />
                <Input
                    disabled={!isEditing}
                    data-testid="commune-input"
                    label="Commune"
                    nativeInputProps={{
                        value: commune,
                        onChange: handleCommuneChange,
                        onBlur: (e) => validateCommune(e.target.value),
                    }}
                    state={communeInvalid ? 'error' : 'default'}
                    stateRelatedMessage={
                        communeInvalid
                            ? 'Veuillez saisir une commune'
                            : undefined
                    }
                />
                <Input
                    disabled={!isEditing}
                    data-testid="profession-input"
                    label="Profession"
                    nativeInputProps={{
                        value: profession,
                        onChange: handleProfessionChange,
                        onBlur: (e) => validateProfession(e.target.value),
                    }}
                    state={professionInvalid ? 'error' : 'default'}
                    stateRelatedMessage={
                        professionInvalid
                            ? 'Veuillez saisir une profession'
                            : undefined
                    }
                />
                {isEditing && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Button
                            data-testid="cancel-edit-info-button"
                            priority="secondary"
                            onClick={toggleEditingMode}
                        >
                            Annuler
                        </Button>
                        <Button
                            data-testid="submit-edit-info-button"
                            iconId="fr-icon-save-line"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? 'Enregistrement en cours'
                                : 'Enregistrer'}
                        </Button>
                    </Box>
                )}
                {!isEditing && (
                    <Button
                        style={{ alignSelf: 'flex-end' }}
                        data-testid="edit-info-button-1"
                        iconId="fr-icon-edit-box-line"
                        title="Modifier"
                        onClick={toggleEditingMode}
                    >
                        Modifier
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default InfoSection;
