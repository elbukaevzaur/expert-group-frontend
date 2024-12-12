import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    PageResponse,
    PageRequest,
    Pageable,
    FilterProperty,
    Products,
    FiltersResponse,
    ProductDetailsResponse
} from '@/lib/models';
import {any} from "prop-types";

interface ProductsState {
    allProducts: PageResponse<Products>;
    pageable: {
        page: number,
        perPage: number
    },
    pageRequest: PageRequest,
    filters: FiltersResponse[],
    details: ProductDetailsResponse | null
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
    pageRequest: { filters: [], orderedColumns: [] },
    filters: [],
    details: null
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
                if (index !== -1){
                    if (action.payload.operator === 'IN'){
                        console.log(state.pageRequest.filters[index].value
                            .filter(f => action.payload.value.indexOf(f) !== -1))
                        if (state.pageRequest.filters[index].value.length == 1 && state.pageRequest.filters[index].value
                            .filter(f => action.payload.value.indexOf(f) !== -1).length === 0){
                            state.pageRequest.filters = state.pageRequest.filters.filter(f => f.field !== action.payload.field);
                        }else {
                            state.pageRequest.filters[index].value = action.payload.value;
                        }
                    }else {
                        state.pageRequest.filters[index].value = action.payload.value;
                    }
                } else
                    state.pageRequest.filters.push(action.payload);
            }
        },
        REMOVE_FILTER: (state, action: PayloadAction<FilterProperty>) => {
            const index = state.pageRequest.filters.map(m => m.field).indexOf(action.payload.field);
            state.pageRequest.filters.splice(index, 1);
        },
        REMOVE_ALL_FILTER: (state) => {
            state.pageRequest.filters = [];
        },
        FILTERS_FETCH_REQUESTED: (state, action) => {
        },
        FILTERS_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.filters = action.payload
        },
        SORTED: (state, action) => {
            state.pageRequest.orderedColumns = [action.payload];
        },
        DETAILS_FETCH_REQUESTED: (state, action) => {
        },
        DETAILS_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.details = action.payload
        }
    }
});

export const { PRODUCTS_FETCH_REQUESTED,
    PRODUCTS_FETCH_RESPONSE_SUCCESS,
    PRODUCTS_SHOW_MORE_FETCH_REQUESTED,
    PRODUCTS_SHOW_MORE_FETCH_RESPONSE_SUCCESS,
    ADD_FILTER,
    REMOVE_FILTER,
    REMOVE_ALL_FILTER,
    FILTERS_FETCH_REQUESTED,
    FILTERS_FETCH_RESPONSE_SUCCESS,
    SORTED,
    DETAILS_FETCH_REQUESTED,
    DETAILS_FETCH_RESPONSE_SUCCESS
} = products.actions;
export default products.reducer;