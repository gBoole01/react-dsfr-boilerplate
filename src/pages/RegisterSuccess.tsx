import { fr } from '@codegouvfr/react-dsfr';
import Alert from '@codegouvfr/react-dsfr/Alert';
import { useIsDark } from '@codegouvfr/react-dsfr/useIsDark';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

function RegisterSuccess() {
    const { isDark } = useIsDark();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
                Création de compte sur NomDeL'App
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
                <Alert
                    data-testid="register-success-alert"
                    description="Votre compte a bien été créé. Vous recevrez un courriel dans quelques instants contenant un lien de confirmation."
                    severity="success"
                    small
                />
                <span
                    className={fr.cx('fr-hint-text')}
                    style={{ marginBottom: '12px' }}
                >
                    Si vous n'avez pas reçu de courriel (n'hésitez pas à
                    vérifier dans les indérisables), vous pouvez saisir à
                    nouveau votre adresse électronique.
                </span>
            </Box>
        </Box>
    );
}

export default RegisterSuccess;
