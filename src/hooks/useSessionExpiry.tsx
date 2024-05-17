import { createModal } from '@codegouvfr/react-dsfr/Modal';
import { useRefreshAccessTokenMutation } from '@src/features/auth/authApi';
import { selectAccessTokenExpiresAt } from '@src/features/auth/authSlice';
import { useAppSelector } from '@src/store/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from './useLogout';

function useSessionExpiry() {
    const navigate = useNavigate();
    const { handleLogout } = useLogout();
    const accessTokenExpiresAt = useAppSelector(selectAccessTokenExpiresAt);
    const [refreshAccessToken] = useRefreshAccessTokenMutation();

    const sessionExpiryModal = createModal({
        id: 'session-expiry-modal',
        isOpenedByDefault: false,
    });

    useEffect(() => {
        const checkTokenExpiry = () => {
            if (!accessTokenExpiresAt) return;
            const timeUntilExpiry = accessTokenExpiresAt - Date.now();
            if (timeUntilExpiry <= 0) {
                sessionExpiryModal.close();
                handleLogout();
            }
            if (timeUntilExpiry > 0 && timeUntilExpiry < 1000 * 60 * 5) {
                sessionExpiryModal.open();
            }
        };

        const intervalId = setInterval(checkTokenExpiry, 1000 * 60);
        return () => clearInterval(intervalId);
    }, [accessTokenExpiresAt, handleLogout, navigate, sessionExpiryModal]);

    const handleKeepAlive = async () => {
        try {
            await refreshAccessToken().unwrap().catch(handleLogout);
        } catch (error) {
            handleLogout();
        }
        sessionExpiryModal.close();
    };

    const handleDisconnect = () => {
        sessionExpiryModal.close();
        handleLogout();
    };

    return { sessionExpiryModal, handleKeepAlive, handleDisconnect };
}

export default useSessionExpiry;
