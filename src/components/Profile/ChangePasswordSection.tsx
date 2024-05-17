import Alert from '@codegouvfr/react-dsfr/Alert';
import Button from '@codegouvfr/react-dsfr/Button';
import PasswordInput from '@codegouvfr/react-dsfr/blocks/PasswordInput';
import { Box, Typography } from '@mui/material';
import useChangePassword from '@src/hooks/useChangePassword';

function ChangePasswordSection() {
    const {
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
        handleConfirmPasswordChange,
        validateConfirmPassword,
        handleChangePassword,
        isLoading,
        isClientError,
        isServerError,
    } = useChangePassword();

    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
            data-testid="change-password-section"
        >
            <Typography variant="h3" component="h2">
                Changer de mot de passe
            </Typography>
            {(isClientError || isServerError) && (
                <Alert
                    data-testid={
                        isClientError
                            ? 'change-password-client-error-alert'
                            : isServerError
                            ? 'change-password-server-error-alert'
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
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'stretch',
                }}
                data-testid="change-password-form"
                onSubmit={handleChangePassword}
            >
                <PasswordInput
                    data-testid="current-password-input"
                    label="Mot de passe actuel"
                    nativeInputProps={{
                        value: currentPassword,
                        onChange: handleCurrentPasswordChange,
                        onBlur: (e) => validateCurrentPassword(e.target.value),
                    }}
                    messages={
                        currentPasswordInvalid
                            ? [
                                  {
                                      message:
                                          'Veuillez saisir votre mot de passe actuel',
                                      severity: 'error',
                                  },
                              ]
                            : undefined
                    }
                />
                <PasswordInput
                    data-testid="new-password-input"
                    label="Nouveau mot de passe"
                    nativeInputProps={{
                        value: newPassword,
                        onChange: handleNewPasswordChange,
                        onBlur: (e) => validateNewPassword(e.target.value),
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
                <Button
                    style={{ alignSelf: 'flex-end' }}
                    data-testid="submit-change-password-button"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Enregistrement en cours' : 'Enregistrer'}
                </Button>
            </Box>
        </Box>
    );
}

export default ChangePasswordSection;
