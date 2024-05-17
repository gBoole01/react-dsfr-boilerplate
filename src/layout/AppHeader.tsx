import Badge from '@codegouvfr/react-dsfr/Badge';
import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display';
import Header from '@codegouvfr/react-dsfr/Header';
import { ROUTES } from '@router/routes';
import { selectIsLoggedIn } from '@src/features/auth/authSlice';
import useLogout from '@src/hooks/useLogout';
import { useAppSelector } from '@src/store/hooks';

function AppHeader() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const { handleLogout } = useLogout();

    return (
        <Header
            brandTop={
                <>
                    MINISTÈRE
                    <br />
                    DE
                    <br />
                    NomDuMinistère
                </>
            }
            homeLinkProps={{
                to: ROUTES.HOME,
                title: "Accueil | NomDeL'App -  Ministère de NomDuMinistère",
            }}
            id="fr-header-header-with-quick-access-items"
            serviceTitle={
                <>
                    NomDeL'App{' '}
                    <Badge as="span" noIcon severity="success">
                        Beta
                    </Badge>
                </>
            }
            serviceTagline="Slogan de l'application"
            quickAccessItems={[
                !isLoggedIn && headerFooterDisplayItem,
                isLoggedIn && {
                    linkProps: {
                        to: ROUTES.PROFILE,
                    },
                    iconId: 'fr-icon-user-line',
                    text: 'Mon profil',
                },
                isLoggedIn && {
                    buttonProps: {
                        onClick: handleLogout,
                    },
                    iconId: 'fr-icon-logout-box-r-line',
                    text: 'Se déconnecter',
                },
                !isLoggedIn && {
                    linkProps: {
                        to: ROUTES.REGISTER,
                    },
                    iconId: 'fr-icon-user-add-line',
                    text: 'S’inscrire',
                },
                !isLoggedIn && {
                    linkProps: {
                        to: ROUTES.LOGIN,
                    },
                    iconId: 'fr-icon-account-circle-line',
                    text: 'Se connecter',
                },
            ]}
        />
    );
}

export default AppHeader;
