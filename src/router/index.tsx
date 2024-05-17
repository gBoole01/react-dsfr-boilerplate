/* eslint-disable react-refresh/only-export-components */
import { ROUTES } from '@router/routes';
import App from '@src/App';
import Spinner from '@src/components/Globals/Spinner';
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const SuspenseFallback = ({ children }: React.PropsWithChildren) => {
    return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

const Accessibility = lazy(() => import('@src/pages/Accessibility'));
const EmailVerify = lazy(() => import('@src/pages/EmailVerify'));
const Error = lazy(() => import('@src/pages/Error'));
const ForgotPassword = lazy(() => import('@src/pages/ForgotPassword'));
const Home = lazy(() => import('@src/pages/Home'));
const Legals = lazy(() => import('@src/pages/Legals'));
const Login = lazy(() => import('@src/pages/Login'));
const PrivacyPolicy = lazy(() => import('@src/pages/PrivacyPolicy'));
const Profile = lazy(() => import('@src/pages/Profile'));
const Register = lazy(() => import('@src/pages/Register'));
const RegisterSuccess = lazy(() => import('@src/pages/RegisterSuccess'));
const ResetPassword = lazy(() => import('@src/pages/ResetPassword'));
const Sitemap = lazy(() => import('@src/pages/Sitemap'));
const TermsAndConditions = lazy(() => import('@src/pages/TermsAndConditions'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: (
            <SuspenseFallback>
                <Error />
            </SuspenseFallback>
        ),
        children: [
            {
                path: ROUTES.HOME,
                element: (
                    <SuspenseFallback>
                        <Home />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.SITEMAP,
                element: (
                    <SuspenseFallback>
                        <Sitemap />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.LEGALS,
                element: (
                    <SuspenseFallback>
                        <Legals />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.ACCESSIBILITY,
                element: (
                    <SuspenseFallback>
                        <Accessibility />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.PRIVACY_POLICY,
                element: (
                    <SuspenseFallback>
                        <PrivacyPolicy />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.TERMS_AND_CONDITIONS,
                element: (
                    <SuspenseFallback>
                        <TermsAndConditions />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.FORGOT_PASSWORD,
                element: (
                    <SuspenseFallback>
                        <ForgotPassword />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.RESET_PASSWORD,
                element: (
                    <SuspenseFallback>
                        <ResetPassword />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.REGISTER,
                element: (
                    <SuspenseFallback>
                        <Register />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.REGISTER_SUCCESS,
                element: (
                    <SuspenseFallback>
                        <RegisterSuccess />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.LOGIN,
                element: (
                    <SuspenseFallback>
                        <Login />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.EMAIL_VERIFY,
                element: (
                    <SuspenseFallback>
                        <EmailVerify />
                    </SuspenseFallback>
                ),
            },
            {
                path: ROUTES.PROFILE,
                element: (
                    <SuspenseFallback>
                        <Profile />
                    </SuspenseFallback>
                ),
            },
        ],
    },
]);

export default router;
