import { createMuiDsfrThemeProvider } from '@codegouvfr/react-dsfr/mui';
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa';
import router from '@router/index.tsx';
import Spinner from '@src/components/Globals/Spinner';
import '@src/main.css';
import { persistor, store } from '@src/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Link, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

declare module '@codegouvfr/react-dsfr/spa' {
    interface RegisterLink {
        Link: typeof Link;
    }
}

declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            isDarkModeEnabled: boolean;
        };
    }
}

const { MuiDsfrThemeProvider } = createMuiDsfrThemeProvider({
    augmentMuiTheme: ({ nonAugmentedMuiTheme, isDark }) => ({
        ...nonAugmentedMuiTheme,
        custom: {
            isDarkModeEnabled: isDark,
        },
    }),
});
startReactDsfr({ defaultColorScheme: 'system', Link });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MuiDsfrThemeProvider>
                    <RouterProvider
                        router={router}
                        fallbackElement={<Spinner />}
                    />
                </MuiDsfrThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
