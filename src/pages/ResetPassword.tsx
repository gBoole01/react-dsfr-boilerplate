import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ResetPasswordCard from '@src/components/ResetPassword/ResetPasswordCard';

function ResetPassword() {
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
                Réinitialisation de mot de passe sur NomDeL'App
            </Typography>
            <ResetPasswordCard />
        </Box>
    );
}

export default ResetPassword;
