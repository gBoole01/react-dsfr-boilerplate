import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ForgotPasswordCard from '@src/components/ForgotPassword/ForgotPasswordCard';

function ForgotPassword() {
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
                Récupération de mot de passe sur NomDeL'App
            </Typography>
            <ForgotPasswordCard />
        </Box>
    );
}

export default ForgotPassword;
