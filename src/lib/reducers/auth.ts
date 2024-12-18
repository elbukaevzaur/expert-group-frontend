import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false
    },
    reducers: {
        SIGN_IN_REQUEST: (state, action) => {

        },
        SIGN_OUT: (state) => {

        },
        SIGN_OUT_SUCCESS: (state) => {
            state.isAuth = false;
        },
        SIGN_IN_RESPONSE_SUCCESS: (state, action) => {
            state.isAuth = true;
        },
        INITIAL_TOKEN: (state) => {
        }
    }
});

export const {
    SIGN_IN_REQUEST,
    SIGN_IN_RESPONSE_SUCCESS,
    INITIAL_TOKEN,
    SIGN_OUT,
    SIGN_OUT_SUCCESS
} = auth.actions;
export default auth.reducer;