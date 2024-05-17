import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import CurrentUser from '@src/models/CurrentUser';
import type { RootState } from '@src/store';

interface AuthState {
    currentUser: CurrentUser | null;
    isLoggedIn: boolean;
    accessTokenExpiresAt: number | null;
}

const initialState: AuthState = {
    currentUser: null,
    isLoggedIn: false,
    accessTokenExpiresAt: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<CurrentUser>) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
            state.accessTokenExpiresAt = Date.now() + 1000 * 60 * 60; // 1 hour
        },
        setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
            state.currentUser = action.payload;
        },
        refreshAccessToken: (state) => {
            state.accessTokenExpiresAt = Date.now() + 1000 * 60 * 60; // 1 hour
        },
        logout: (state) => {
            state.currentUser = null;
            state.accessTokenExpiresAt = null;
            state.isLoggedIn = false;
        },
    },
});

export const { login, setCurrentUser, refreshAccessToken, logout } =
    authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAccessTokenExpiresAt = (state: RootState) =>
    state.auth.accessTokenExpiresAt;

export default authSlice.reducer;
