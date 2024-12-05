import { createSlice } from '@reduxjs/toolkit';
import { PageResponse } from '../models/pageResponse';

interface ProductsState {
    allProducts: PageResponse;
    pageable: {
        page: number,
        perPage: number
    }
}

const initialState: ProductsState = {
    allProducts: {
        totalPages: 0,
        currentPage: 0,
        perPage: 0,
        content: []
    },
    pageable: {
        page: 0,
        perPage: 0
    }
};

const products = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        PRODUCTS_FETCH_REQUESTED: (state) => {
        },
        PRODUCTS_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.allProducts = action.payload;
            state.pageable = {
                page: action.payload.currentPage,
                perPage: action.payload.perPage
            }
        }
    }
});

export const { PRODUCTS_FETCH_REQUESTED, PRODUCTS_FETCH_RESPONSE_SUCCESS } = products.actions;
export default products.reducer;