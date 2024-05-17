import { fr } from '@codegouvfr/react-dsfr';
import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display';
import Footer from '@codegouvfr/react-dsfr/Footer';
import { ROUTES } from '@router/routes';
import {
    ConsentBannerAndConsentManagement,
    FooterConsentManagementItem,
    FooterPersonalDataPolicyItem,
} from '@src/components/Globals/ConsentManagement';
import SessionExpiryModal from '@src/components/Globals/SessionExpiryModal';

type AppFooterProps = {
    style?: React.CSSProperties;
};

function AppFooter({ style = {} }: AppFooterProps) {
    return (
        <>
            <Footer
                style={{ ...style }}
                accessibility="fully compliant"
                accessibilityLinkProps={
                    {
                        href: ROUTES.ACCESSIBILITY,
                        to: ROUTES.ACCESSIBILITY,
                    } as { href: string; to: string }
                }
                termsLinkProps={
                    {
                        href: ROUTES.LEGALS,
                        to: ROUTES.LEGALS,
                    } as { href: string; to: string }
                }
                websiteMapLinkProps={
                    {
                        href: ROUTES.SITEMAP,
                        to: ROUTES.SITEMAP,
                    } as { href: string; to: string }
                }
                bottomItems={[
                    headerFooterDisplayItem,
                    <a
                        className={fr.cx('fr-footer__bottom-link')}
                        href={ROUTES.TERMS_AND_CONDITIONS}
                    >
                        Conditions générales d'utilisation
                    </a>,
                    <FooterPersonalDataPolicyItem />,
                    <FooterConsentManagementItem />,
                ]}
            />
            <SessionExpiryModal />
            <ConsentBannerAndConsentManagement />
        </>
    );
}

export default AppFooter;
