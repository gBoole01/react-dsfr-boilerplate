import Alert from '@codegouvfr/react-dsfr/Alert';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { PasswordInput } from '@codegouvfr/react-dsfr/blocks/PasswordInput';
import { Button } from '@mui/material';
import { ROUTES } from '@router/routes';
import { useLogin } from '@src/hooks/useLogin';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
    const {
        email,
        handleEmailChange,
        validateEmail,
        emailInvalid,
        password,
        handlePasswordChange,
        rememberMe,
        toggleRememberMe,
        handleLogin,
        isLoading,
        isError,
    } = useLogin();

    const emailErrorMessage = useMemo(() => {
        if (emailInvalid && !isError) {
            return 'Adresse email invalide';
        }
        if (isError) {
            return 'Veuillez vérifier votre adresse email';
        }
        return undefined;
    }, [emailInvalid, isError]);

    return (
        <>
            {isError && (
                <Alert
                    data-testid="login-error-alert"
                    small
                    severity="error"
                    description="Identifiant/mot de passe incorrect"
                />
            )}
            <form data-testid="login-form">
                <Input
                    data-testid="email-input"
                    hintText="Format attendu: nom@domaine.fr"
                    label="Adresse email"
                    state={emailInvalid || isError ? 'error' : 'default'}
                    stateRelatedMessage={emailErrorMessage}
                    nativeInputProps={{
                        type: 'email',
                        value: email,
                        onChange: handleEmailChange(),
                        onBlur: validateEmail,
                        'aria-invalid': emailInvalid,
                    }}
                />
                <PasswordInput
                    data-testid="password-input"
                    label="Mot de passe"
                    nativeInputProps={{
                        value: password,
                        onChange: handlePasswordChange(),
                    }}
                    messagesHint=""
                    messages={
                        isError
                            ? [
                                  {
                                      message:
                                          'Veuillez vérifier votre mot de passe',
                                      severity: 'error',
                                  },
                              ]
                            : undefined
                    }
                />
                <Link
                    data-testid="forgot-password-link"
                    to={ROUTES.FORGOT_PASSWORD}
                >
                    Mot de passe oublié ?
                </Link>
                <Checkbox
                    data-testid="remember-me-checkbox"
                    options={[
                        {
                            label: 'Se souvenir de moi',
                            nativeInputProps: {
                                name: 'remember-me',
                                value: 'remember-me',
                                checked: rememberMe,
                                onChange: toggleRememberMe,
                            },
                        },
                    ]}
                    style={{ margin: '1rem 0' }}
                />
                <Button
                    data-testid="submit-button"
                    variant="contained"
                    sx={{ width: '100%' }}
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? 'Connexion en cours' : 'Se connecter'}
                </Button>
            </form>
        </>
    );
}

export default LoginForm;
