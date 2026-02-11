import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    selectedCity: string;
}

const initialState: AppState = {
    selectedCity: "Грозный",
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        SET_SELECTED_CITY: (state, action: PayloadAction<string>) => {
            state.selectedCity = action.payload;
        },
    },
});

export const { SET_SELECTED_CITY } = appSlice.actions;
export default appSlice.reducer;
