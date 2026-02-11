import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuth: boolean;
    isAuthError: boolean;
    isAuthLoading: boolean;
    user: any | null;
}

const initialState: AuthState = {
    isAuth: false,
    isAuthError: false,
    isAuthLoading: true,
    user: null
};

const auth = createSlice({
    name: 'auth',
    initialState,
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
            state.user = null;
        },
        INITIAL_TOKEN: (state) => {
            state.isAuthLoading = true
        },
        INITIAL_TOKEN_SUCCESS: (state) => {
            state.isAuthLoading = false
        },
        GET_ME_REQUEST: () => {},
        GET_ME_RESPONSE_SUCCESS: (state, action) => {
            state.user = action.payload;
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
    INITIAL_TOKEN_SUCCESS,
    GET_ME_REQUEST,
    GET_ME_RESPONSE_SUCCESS
} = auth.actions;
export default auth.reducer;