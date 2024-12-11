import { createSlice } from '@reduxjs/toolkit';
import { Category } from '@/lib/models';

interface CategoriesState {
    allCategories: Category[];
    subCategories: Category[]
}

const initialState: CategoriesState = {
    allCategories: [],
    subCategories: []
};

const categories = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        CATEGORIES_FETCH_REQUESTED: (state) => {
        },
        CATEGORIES_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.allCategories = action.payload;
        },
        SUB_CATEGORIES_FETCH_REQUESTED: (state) => {
        },
        SUB_CATEGORIES_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.subCategories = action.payload;
        },
    }
});

export const {
    CATEGORIES_FETCH_REQUESTED,
    CATEGORIES_FETCH_RESPONSE_SUCCESS,
    SUB_CATEGORIES_FETCH_REQUESTED,
    SUB_CATEGORIES_FETCH_RESPONSE_SUCCESS
} = categories.actions;
export default categories.reducer;