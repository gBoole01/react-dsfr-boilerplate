import { fr } from '@codegouvfr/react-dsfr';
import AppFooter from '@layout/AppFooter';
import AppHeader from '@layout/AppHeader';
import { Container } from '@mui/material';

function TwoColumnsLayout({ children }: React.PropsWithChildren) {
    return (
        <>
            <AppHeader />
            <div
                className={fr.cx('fr-container')}
                style={{ display: 'flex', flexGrow: 1, paddingTop: '2rem' }}
            >
                <main style={{ flexGrow: 1 }}>
                    <Container
                        maxWidth="xl"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            marginBottom: '1rem',
                            height: '100%',
                        }}
                    >
                        {children}
                    </Container>
                </main>
                <aside style={{ width: '33%', maxWidth: '390px' }}>
                    <AppFooter
                        style={{
                            boxShadow:
                                'inset 0 1px 0 0 var(--border-plain-blue-france), inset 0 -1px 0 0 var(--border-plain-blue-france)',
                            marginBottom: '1rem',
                        }}
                    />
                </aside>
            </div>
        </>
    );
}

export default TwoColumnsLayout;
