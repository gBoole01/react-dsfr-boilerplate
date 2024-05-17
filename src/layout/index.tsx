import SingleColumnLayout from '@layout/SingleColumnLayout';
import TwoColumnsLayout from '@layout/TwoColumnsLayout';
import { useMediaQuery, useTheme } from '@mui/material';
import { ROUTES } from '@router/routes';
import useBasePath from '@src/hooks/useBasePath';
import React from 'react';

const TwoColumnsLayoutURLs = [ROUTES.HOME];

function Layout({ children }: React.PropsWithChildren) {
    const pathname = useBasePath();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isTwoColumns = TwoColumnsLayoutURLs.includes(pathname);

    if (isTablet) return <SingleColumnLayout>{children}</SingleColumnLayout>;
    if (isTwoColumns) {
        return <TwoColumnsLayout>{children}</TwoColumnsLayout>;
    }

    return <SingleColumnLayout>{children}</SingleColumnLayout>;
}

export default Layout;
