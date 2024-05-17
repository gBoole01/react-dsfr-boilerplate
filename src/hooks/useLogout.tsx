import { useLogoutMutation } from '@src/features/auth/authApi';
import { ROUTES } from '@src/router/routes';
import { useNavigate } from 'react-router-dom';

function useLogout() {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.HOME);
    };

    return { handleLogout };
}

export default useLogout;
