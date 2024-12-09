import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {PageResponse, PageRequest, Pageable, FilterProperty, Products, FiltersResponse} from '@/lib/models';

interface ProductsState {
    allProducts: PageResponse<Products>;
    pageable: {
        page: number,
        perPage: number
    },
    pageRequest: PageRequest,
    filters: FiltersResponse[]
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
    },
    pageRequest: { filters: [] },
    filters: []
};

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        PRODUCTS_FETCH_REQUESTED: (state, action: PayloadAction<Pageable>) => {
            state.pageRequest = { ...state.pageRequest, page: action.payload.page, perPage: action.payload.perPage }
        },
        PRODUCTS_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.allProducts = action.payload;
            state.pageable = {
                page: action.payload.currentPage,
                perPage: action.payload.perPage
            }
        },
        PRODUCTS_SHOW_MORE_FETCH_REQUESTED: (state, action: PayloadAction<Pageable>) => {
            state.pageRequest = { ...state.pageRequest, page: action.payload.page, perPage: action.payload.perPage }
        },
        PRODUCTS_SHOW_MORE_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.allProducts.currentPage = action.payload.currentPage;
            state.allProducts.perPage = action.payload.perPage;
            state.allProducts.totalPages = action.payload.totalPages;
            state.allProducts.content = [...state?.allProducts.content, ...action.payload.content]
            state.pageable = {
                page: action.payload.currentPage,
                perPage: action.payload.perPage
            }
        },
        ADD_FILTER: (state, action: PayloadAction<FilterProperty>) => {
            if (!Array.isArray(state.pageRequest.filters)) {
                state.pageRequest.filters = [];
                state.pageRequest.filters.push(action.payload);
            } else {
                const index = state.pageRequest.filters.map(m => m.field).indexOf(action.payload.field);
                if (index !== -1)
                    state.pageRequest.filters[index].value = action.payload.value;
                else
                    state.pageRequest.filters.push(action.payload);
            }
        },
        FILTERS_FETCH_REQUESTED: (state, action) => {
        },
        FILTERS_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.filters = action.payload
        }
    }
});

export const { PRODUCTS_FETCH_REQUESTED,
    PRODUCTS_FETCH_RESPONSE_SUCCESS,
    PRODUCTS_SHOW_MORE_FETCH_REQUESTED,
    PRODUCTS_SHOW_MORE_FETCH_RESPONSE_SUCCESS,
    ADD_FILTER,
    FILTERS_FETCH_REQUESTED,
    FILTERS_FETCH_RESPONSE_SUCCESS
} = products.actions;
export default products.reducer;