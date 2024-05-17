import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import RegisterCard from '@src/components/Register/RegisterCard';

function Register() {
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
            <RegisterCard />
        </Box>
    );
}

export default Register;
