import { fr } from '@codegouvfr/react-dsfr';
import Alert from '@codegouvfr/react-dsfr/Alert';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';
import Input from '@codegouvfr/react-dsfr/Input';
import PasswordInput from '@codegouvfr/react-dsfr/blocks/PasswordInput';
import { Button } from '@mui/material';
import { ROUTES } from '@router/routes';
import useRegister from '@src/hooks/useRegister';
import { Link } from 'react-router-dom';

function RegisterForm() {
    const {
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
        consentInvalid,
        toggleConsent,
        handleConsentBlur,
        isLoading,
        isClientError,
        isServerError,
        handleRegister,
    } = useRegister();

    return (
        <>
            {(isClientError || isServerError) && (
                <Alert
                    data-testid={
                        isClientError
                            ? 'register-client-error-alert'
                            : isServerError
                            ? 'register-server-error-alert'
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
            <form data-testid="register-form">
                <span
                    className={fr.cx('fr-hint-text')}
                    style={{ marginBottom: '12px' }}
                >
                    Sauf mention contraire, tous les champs sont obligatoires.
                </span>
                <Input
                    style={{ paddingBottom: '1.5rem', marginBottom: '0' }}
                    data-testid="email-input"
                    hintText="Format attendu: nom@domaine.fr"
                    label="Adresse email"
                    state={emailInvalid ? 'error' : 'default'}
                    stateRelatedMessage="Adresse email invalide"
                    nativeInputProps={{
                        type: 'email',
                        value: email,
                        onChange: handleEmailChange,
                        onBlur: (e) => validateEmail(e.target.value),
                        'aria-invalid': emailInvalid,
                    }}
                />
                <PasswordInput
                    style={{ paddingBottom: '1.5rem' }}
                    data-testid="password-input"
                    label="Mot de passe"
                    nativeInputProps={{
                        value: password,
                        onChange: handlePasswordChange,
                        onBlur: (e) => validatePassword(e.target.value),
                    }}
                    messages={[
                        {
                            message: '12 caractères minimum',
                            severity: passwordInvalidLength ? 'error' : 'info',
                        },
                        {
                            message: '1 caractère spécial minimum',
                            severity: passwordInvalidSpecialCharacters
                                ? 'error'
                                : 'info',
                        },
                        {
                            message: '1 chiffre minimum',
                            severity: passwordInvalidNumber ? 'error' : 'info',
                        },
                    ]}
                />
                <PasswordInput
                    style={{ paddingBottom: '1.5rem' }}
                    data-testid="confirm-password-input"
                    label="Confirmer le mot de passe"
                    nativeInputProps={{
                        value: confirmPassword,
                        onChange: handleConfirmPasswordChange,
                        onBlur: (e) => validateConfirmPassword(e.target.value),
                    }}
                    hintText="Les mots de passe doivent être identiques"
                    messagesHint=""
                    messages={
                        confirmPasswordInvalid
                            ? [
                                  {
                                      message:
                                          'Les mots de passe ne correspondent pas',
                                      severity: 'error',
                                  },
                              ]
                            : undefined
                    }
                />
                <Input
                    style={{ paddingBottom: '1.5rem', marginBottom: '0' }}
                    data-testid="birthdate-input"
                    hintText="Vous devez avoir plus de 16 ans pour créer un compte"
                    label="Date de naissance"
                    nativeInputProps={{
                        type: 'date',
                        placeholder: 'JJ/MM/AAAA',
                        value: birthdate,
                        onChange: handleBirthdateChange,
                        onBlur: (e) => validateBirthdate(e.target.value),
                    }}
                    state={birthdateInvalid ? 'error' : 'default'}
                    stateRelatedMessage={
                        birthdateInvalid
                            ? 'Vous devez avoir plus de 16 ans pour créer un compte'
                            : undefined
                    }
                />
                <Checkbox
                    data-testid="consent-checkbox"
                    options={[
                        {
                            label: (
                                <span>
                                    Jai lu et j'accepte les{' '}
                                    <Link to={ROUTES.TERMS_AND_CONDITIONS}>
                                        Conditions Générales d'Utilisation
                                    </Link>
                                </span>
                            ),
                            nativeInputProps: {
                                name: 'user-consent',
                                value: 'user-consent',
                                checked: consentAccepted,
                                onChange: toggleConsent,
                                onBlur: handleConsentBlur,
                            },
                        },
                    ]}
                    state={consentInvalid ? 'error' : 'default'}
                    stateRelatedMessage={
                        consentInvalid
                            ? 'Vous devez accepter les conditions d’utilisation'
                            : undefined
                    }
                />
                <Button
                    data-testid="submit-button"
                    variant="contained"
                    sx={{ width: '100%' }}
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                    {isLoading ? 'Inscription en cours' : 'Créer mon compte'}
                </Button>
            </form>
        </>
    );
}

export default RegisterForm;
