import CurrentUser from '@src/models/CurrentUser';
import ChangePasswordDTO from '@src/models/dto/ChangePasswordDTO';
import ForgotPasswordDTO from '@src/models/dto/ForgotPasswordDTO';
import LoginDTO from '@src/models/dto/LoginDTO';
import RegisterDTO from '@src/models/dto/RegisterDTO';
import ResetPasswordDTO from '@src/models/dto/ResetPasswordDTO';
import { api } from '@store/api';
import { login, logout, refreshAccessToken } from './authSlice';

const AUTH_ENDPOINT = 'auth';

export const authAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<CurrentUser, LoginDTO>({
            query: (body) => ({
                url: `${AUTH_ENDPOINT}/login`,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    if (result) {
                        dispatch(login(result.data));
                    }
                } catch (error) {
                    // Handle error
                }
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `${AUTH_ENDPOINT}/logout`,
                method: 'POST',
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                if (await queryFulfilled) {
                    dispatch(logout());
                }
            },
        }),
        refreshAccessToken: builder.mutation<void, void>({
            query: () => ({
                url: `${AUTH_ENDPOINT}/refresh-token`,
                method: 'GET',
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                if (await queryFulfilled) {
                    dispatch(refreshAccessToken());
                }
            },
        }),
        register: builder.mutation<void, RegisterDTO>({
            query: (body) => ({
                url: `${AUTH_ENDPOINT}/register`,
                method: 'POST',
                body,
            }),
        }),
        getCurrentUser: builder.query<CurrentUser, void>({
            query: () => `${AUTH_ENDPOINT}/me`,
        }),
        forgotPassword: builder.mutation<void, ForgotPasswordDTO>({
            query: (body) => ({
                url: `${AUTH_ENDPOINT}/forgot-password`,
                method: 'POST',
                body,
            }),
        }),
        resetPassword: builder.mutation<CurrentUser, ResetPasswordDTO>({
            query: (body) => ({
                url: `${AUTH_ENDPOINT}/reset-password`,
                method: 'POST',
                body,
            }),
        }),
        changePassword: builder.mutation<void, ChangePasswordDTO>({
            query: (body) => ({
                url: `${AUTH_ENDPOINT}/change-password`,
                method: 'POST',
                body,
            }),
        }),
        verifyToken: builder.mutation<CurrentUser, string>({
            query: (token) => ({
                url: `${AUTH_ENDPOINT}/verify-token/${token}`,
                method: 'POST',
            }),
        }),
        verifyEmail: builder.mutation<CurrentUser, string>({
            query: (token) => ({
                url: `${AUTH_ENDPOINT}/verify-email/${token}`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useRefreshAccessTokenMutation,
    useGetCurrentUserQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useVerifyTokenMutation,
    useVerifyEmailMutation,
} = authAPI;
