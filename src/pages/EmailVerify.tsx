import { fr } from '@codegouvfr/react-dsfr';
import Alert from '@codegouvfr/react-dsfr/Alert';
import { useIsDark } from '@codegouvfr/react-dsfr/useIsDark';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Spinner from '@src/components/Globals/Spinner';
import { useVerifyEmailMutation } from '@src/features/auth/authApi';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EmailVerify() {
    const theme = useTheme();
    const { isDark } = useIsDark();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [verififyEmail, { isUninitialized, isLoading, isError, isSuccess }] =
        useVerifyEmailMutation();
    const { token } = useParams();

    useEffect(() => {
        setTimeout(() => {
            if (token) verififyEmail(token);
        }, 1000);
    }, [token, verififyEmail]);

    return (
        <Box
            sx={{
                minWidth: isTablet ? undefined : '430px',
                width: isTablet ? '100%' : '50%',
                margin: isTablet ? '40px auto' : '56px auto',
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                sx={{ marginBottom: '40px' }}
            >
                Activation de compte sur NomDeL'App
            </Typography>
            <Box
                sx={{
                    padding: isTablet ? '2rem 1rem' : '2rem 3rem',
                    backgroundColor: isDark ? '#1E1E1E' : '#F6F6F6',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                {isUninitialized || isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <Alert
                            data-testid={
                                isError
                                    ? 'email-verified-error-alert'
                                    : isSuccess
                                    ? 'email-verified-success-alert'
                                    : undefined
                            }
                            description={
                                isError
                                    ? 'Le lien de vérification est invalide ou a expiré.'
                                    : isSuccess
                                    ? "Votre compte a bien été activé. Vous pouvez dès maintenant commencer à l'utiliser."
                                    : ''
                            }
                            severity={
                                isError
                                    ? 'error'
                                    : isSuccess
                                    ? 'success'
                                    : 'info'
                            }
                            small
                        />
                        <span
                            className={fr.cx('fr-hint-text')}
                            style={{ marginBottom: '12px' }}
                        >
                            {isError
                                ? 'Si vous pensez qu’il s’agit d’une erreur, veuillez réessayer ou contactez-nous.'
                                : isSuccess
                                ? "Nous sommes ravis de vous accueillir parmi nous ! Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à nous contacter."
                                : ''}
                        </span>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default EmailVerify;
