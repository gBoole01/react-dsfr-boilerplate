import AppFooter from '@layout/AppFooter';
import AppHeader from '@layout/AppHeader';
import { Container } from '@mui/material';
import React from 'react';

function SingleColumnLayout({ children }: React.PropsWithChildren) {
    return (
        <>
            <AppHeader />
            <main style={{ flexGrow: 1, paddingTop: '2rem' }}>
                <Container
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginBottom: '1rem',
                    }}
                >
                    {children}
                </Container>
            </main>
            <AppFooter />
        </>
    );
}

export default SingleColumnLayout;
