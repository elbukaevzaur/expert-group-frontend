import { createSlice } from '@reduxjs/toolkit';

interface Category {
    id: number,
    name: string,
    productCount: number
}

interface CategoriesState {
    allCategories: Category[];
}

// Инициализируем начальное состояние
const initialState: CategoriesState = {
    allCategories: []
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
    }
});

export const {
    CATEGORIES_FETCH_REQUESTED,
    CATEGORIES_FETCH_RESPONSE_SUCCESS
} = categories.actions;
export default categories.reducer;