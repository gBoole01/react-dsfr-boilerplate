import { Box, useMediaQuery, useTheme } from '@mui/material';
import LoginCard from '@src/components/Login/LoginCard';

function Login() {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                minWidth: isTablet ? undefined : '440px',
                width: isTablet ? '100%' : '40%',
                margin: isTablet ? '40px auto' : '56px auto',
            }}
        >
            <LoginCard />
        </Box>
    );
}

export default Login;
