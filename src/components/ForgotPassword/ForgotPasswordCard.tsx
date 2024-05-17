import { fr } from '@codegouvfr/react-dsfr';
import Alert from '@codegouvfr/react-dsfr/Alert';
import { useIsDark } from '@codegouvfr/react-dsfr/useIsDark';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ForgotPasswordForm from '@src/components/ForgotPassword/ForgotPasswordForm';
import { useState } from 'react';

function ForgotPasswordCard() {
    const { isDark } = useIsDark();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [forgotSuccess, setForgotSuccess] = useState(false);

    const handleSuccess = () => {
        setForgotSuccess(true);
    };

    return (
        <Box
            sx={{
                padding: isTablet ? '2rem 1rem' : '2rem 3rem',
                backgroundColor: isDark ? '#1E1E1E' : '#F6F6F6',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            }}
        >
            <Typography variant="h4" component="h2">
                Récupérer le mot de passe de votre compte
            </Typography>
            {forgotSuccess ? (
                <>
                    <Alert
                        data-testid="forgot-password-success-alert"
                        description="Votre demande de récupération de mot de passe a été transmise. Vous recevrez un courriel dans quelques instants."
                        severity="success"
                        small
                    />
                    <span
                        className={fr.cx('fr-hint-text')}
                        style={{ marginBottom: '12px' }}
                    >
                        Si vous n'avez pas reçu de courriel (n'hésitez pas à
                        vérifier dans les indésirables), veuillez nous
                        contacter.
                    </span>
                </>
            ) : (
                <>
                    <Typography variant="body1">
                        Veuillez saisir l'adresse électronique associée à votre
                        compte. Nous vous enverrons plus d'informations pour
                        réinitialiser votre mot de passe
                    </Typography>
                    <ForgotPasswordForm onSuccess={handleSuccess} />
                </>
            )}
        </Box>
    );
}

export default ForgotPasswordCard;
