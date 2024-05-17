import { fr } from '@codegouvfr/react-dsfr';
import Alert from '@codegouvfr/react-dsfr/Alert';
import { PasswordInput } from '@codegouvfr/react-dsfr/blocks/PasswordInput';
import { Button } from '@mui/material';
import useResetPassword from '@src/hooks/useResetPassword';
import Spinner from '../Globals/Spinner';

function ResetPasswordForm() {
    const {
        isVerifying,
        isValidToken,
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
        isClientError,
        isServerError,
        handleResetPassword,
        resetPasswordSuccess,
    } = useResetPassword();

    if (isVerifying) {
        return <Spinner />;
    }
    if (isValidToken && !resetPasswordSuccess) {
        return (
            <>
                {(isClientError || isServerError) && (
                    <Alert
                        data-testid={
                            isClientError
                                ? 'reset-password-client-error-alert'
                                : isServerError
                                ? 'reset-password-server-error-alert'
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

                <form data-testid="reset-password-form">
                    <span
                        className={fr.cx('fr-hint-text')}
                        style={{ marginBottom: '12px' }}
                    >
                        Sauf mention contraire, tous les champs sont
                        obligatoires.
                    </span>
                    <PasswordInput
                        style={{ paddingBottom: '1.5rem' }}
                        data-testid="password-input"
                        label="Mot de passe"
                        nativeInputProps={{
                            value: password,
                            onChange: handlePasswordChange(),
                            onBlur: (e) => validatePassword(e.target.value),
                        }}
                        messages={[
                            {
                                message: '12 caractères minimum',
                                severity: passwordInvalidLength
                                    ? 'error'
                                    : 'info',
                            },
                            {
                                message: '1 caractère spécial minimum',
                                severity: passwordInvalidSpecialCharacters
                                    ? 'error'
                                    : 'info',
                            },
                            {
                                message: '1 chiffre minimum',
                                severity: passwordInvalidNumber
                                    ? 'error'
                                    : 'info',
                            },
                        ]}
                    />
                    <PasswordInput
                        style={{ paddingBottom: '1.5rem' }}
                        data-testid="confirm-password-input"
                        label="Confirmer le mot de passe"
                        nativeInputProps={{
                            value: confirmPassword,
                            onChange: handleConfirmPasswordChange(),
                            onBlur: (e) =>
                                validateConfirmPassword(e.target.value),
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
                    <Button
                        data-testid="submit-button"
                        variant="contained"
                        sx={{ width: '100%' }}
                        onClick={handleResetPassword}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? 'Envoi en cours...'
                            : 'Réinitialiser mon mot de passe'}
                    </Button>
                </form>
            </>
        );
    }

    if (resetPasswordSuccess) {
        return (
            <Alert
                data-testid="reset-password-success-alert"
                small
                severity="success"
                description="Votre mot de passe a été réinitialisé avec succès."
            />
        );
    }

    return (
        <Alert
            data-testid="reset-password-invalid-token-alert"
            severity="error"
            title="Lien invalide"
            description="Le lien de réinitialisation de mot de passe est invalide ou a expiré."
        />
    );
}

export default ResetPasswordForm;
