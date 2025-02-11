import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isAuthError: false,
        isAuthLoading: true
    },
    reducers: {
        SIGN_IN_REQUEST: (state, action) => {
            state.isAuthLoading = true
        },
        SIGN_IN_RESPONSE_SUCCESS: (state, action) => {
            state.isAuth = true;
            state.isAuthError = false;
            state.isAuthLoading = false
        },
        SIGN_IN_RESPONSE_ERROR: (state) => {
            state.isAuthError = true;
            state.isAuthLoading = false
        },
        SIGN_OUT: (state) => {

        },
        SIGN_OUT_SUCCESS: (state) => {
            state.isAuth = false;
        },
        INITIAL_TOKEN: (state) => {
            state.isAuthLoading = true
        },
        INITIAL_TOKEN_SUCCESS: (state) => {
            state.isAuthLoading = false
        }
    }
});

export const {
    SIGN_IN_REQUEST,
    SIGN_IN_RESPONSE_SUCCESS,
    SIGN_IN_RESPONSE_ERROR,
    INITIAL_TOKEN,
    SIGN_OUT,
    SIGN_OUT_SUCCESS,
    INITIAL_TOKEN_SUCCESS
} = auth.actions;
export default auth.reducer;