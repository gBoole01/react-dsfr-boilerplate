import { useIsDark } from '@codegouvfr/react-dsfr/useIsDark';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import RegisterForm from '@src/components/Register/RegisterForm';

function RegisterCard() {
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
                gap: '12px',
            }}
        >
            <>
                <Typography variant="h4" component="h1">
                    Se créer un compte en choisissant un identifiant
                </Typography>
                <RegisterForm />
            </>
        </Box>
    );
}

export default RegisterCard;
