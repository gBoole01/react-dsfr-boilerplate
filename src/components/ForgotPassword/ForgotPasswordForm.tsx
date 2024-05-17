import Alert from '@codegouvfr/react-dsfr/Alert';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@mui/material';
import useForgotPassword from '@src/hooks/useForgotPassword';

type ForgotPasswordFormProps = {
    onSuccess: () => void;
};

function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
    const {
        email,
        handleEmailChange,
        validateEmail,
        emailInvalid,
        isLoading,
        isError,
        handleForgotPassword,
    } = useForgotPassword({ onSuccess });

    return (
        <>
            {isError && (
                <Alert
                    data-testid="reset-password-error-alert"
                    small
                    severity="error"
                    description="Une erreur est survenue. Veuillez réessayer ultérieurement."
                />
            )}
            <form data-testid="forgot-password-form">
                <Input
                    data-testid="email-input"
                    hintText="Format attendu: nom@domaine.fr"
                    label="Adresse email"
                    state={emailInvalid ? 'error' : 'default'}
                    stateRelatedMessage={'Adresse email invalide'}
                    nativeInputProps={{
                        type: 'email',
                        value: email,
                        onChange: handleEmailChange(),
                        onBlur: validateEmail,
                        'aria-invalid': emailInvalid,
                    }}
                />
                <Button
                    data-testid="submit-button"
                    variant="contained"
                    sx={{ width: '100%' }}
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                >
                    {isLoading ? 'Envoi en cours...' : 'Valider'}
                </Button>
            </form>
        </>
    );
}

export default ForgotPasswordForm;
