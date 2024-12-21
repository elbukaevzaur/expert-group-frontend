import { createSlice } from '@reduxjs/toolkit';

interface FavoriteState {
    allFavorites: { [key: number]: number };
}

const initialState: FavoriteState = {
    allFavorites: {}
};

const favorite = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        ALL_FAVORITES_REQUEST: () => {},
        ALL_FAVORITES_RESPONSE_SUCCESS: (state, action) => {
            state.allFavorites = action.payload;
        },
        CHANGE_FAVORITES_REQUEST: (state, action) => {

        },
        CHANGE_FAVORITES_RESPONSE_SUCCESS: (state, action) => {
            if (state.allFavorites.hasOwnProperty(action.payload.productId)) {
                delete state.allFavorites[action.payload.productId];
            }else {
                // Доработать, значением должно быть favoriteId а не productId
                state.allFavorites[action.payload.productId] = action.payload.productId;
            }
        }
    }
});

export const {
    ALL_FAVORITES_REQUEST,
    ALL_FAVORITES_RESPONSE_SUCCESS,
    CHANGE_FAVORITES_REQUEST,
    CHANGE_FAVORITES_RESPONSE_SUCCESS
} = favorite.actions;
export default favorite.reducer;