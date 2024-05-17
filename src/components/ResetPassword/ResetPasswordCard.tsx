import { useIsDark } from '@codegouvfr/react-dsfr/useIsDark';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ResetPasswordForm from '@src/components/ResetPassword/ResetPasswordForm';

function ResetPasswordCard() {
    const { isDark } = useIsDark();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
                Définir le nouveau mot de passe de votre compte
            </Typography>
            <ResetPasswordForm />
        </Box>
    );
}

export default ResetPasswordCard;
