import { useIsDark } from '@codegouvfr/react-dsfr/useIsDark';
import {
    Box,
    Button,
    Divider,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { ROUTES } from '@router/routes';
import LoginForm from '@src/components/Login/LoginForm';
import { useNavigate } from 'react-router-dom';

function LoginCard() {
    const navigate = useNavigate();
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
            <Typography variant="h4" component="h1">
                Connexion à NomDeL'App
            </Typography>
            <LoginForm />
            <Divider sx={{ padding: 0 }} />
            <Typography variant="h4" component="h1">
                Vous n'avez pas de compte ?
            </Typography>
            <Button
                data-testid="register-link"
                onClick={() => navigate(ROUTES.REGISTER)}
                variant="outlined"
            >
                Créer un compte
            </Button>
        </Box>
    );
}

export default LoginCard;
