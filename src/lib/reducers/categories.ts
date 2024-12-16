import { createSlice } from '@reduxjs/toolkit';
import { Category } from '@/lib/models';

interface CategoriesState {
    allCategories: Category[],
    subCategories: Category[],
    currentCategory: Category | null,
    currentSubCategory: Category | null
}

const initialState: CategoriesState = {
    allCategories: [],
    subCategories: [],
    currentCategory: null,
    currentSubCategory: null
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
        CURRENT_CATEGORY_FETCH_REQUESTED: (state, action) => {

        },
        CURRENT_CATEGORY_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.currentCategory = action.payload;
        },
        CURRENT_SUB_CATEGORY_FETCH_REQUESTED: (state, action) => {

        },
        CURRENT_SUB_CATEGORY_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.currentSubCategory = action.payload;
        }
    }
});

export const {
    CATEGORIES_FETCH_REQUESTED,
    CATEGORIES_FETCH_RESPONSE_SUCCESS,
    SUB_CATEGORIES_FETCH_REQUESTED,
    SUB_CATEGORIES_FETCH_RESPONSE_SUCCESS,
    CURRENT_CATEGORY_FETCH_REQUESTED,
    CURRENT_CATEGORY_FETCH_RESPONSE_SUCCESS,
    CURRENT_SUB_CATEGORY_FETCH_REQUESTED,
    CURRENT_SUB_CATEGORY_FETCH_RESPONSE_SUCCESS
} = categories.actions;
export default categories.reducer;