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

interface ProductsState {
    allProducts: PageResponse<Products>,
    allFavoriteProducts: PageResponse<Products>,
    pageRequest: PageRequest,
    filters: FiltersResponse[],
    details: ProductDetailsResponse
}

const initialState: ProductsState = {
    allProducts: {
        totalPages: 0,
        page: 0,
        perPage: 0,
        content: [],
        orderedColumns: []
    },
    allFavoriteProducts: {
        totalPages: 0,
        page: 0,
        perPage: 0,
        content: [],
        orderedColumns: []
    },
    pageRequest: { filters: [], orderedColumns: [], page: 1 },
    filters: [],
    details: {} as ProductDetailsResponse
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
            state.pageRequest = { ...state.pageRequest, page: action.payload.page, perPage: action.payload.perPage, totalPages: action.payload.totalPages }
        },
        FAVORITE_PRODUCTS_FETCH_REQUESTED: (state) => {
        },
        FAVORITE_PRODUCTS_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.allFavoriteProducts = action.payload;
        },
        PRODUCTS_SHOW_MORE_FETCH_REQUESTED: (state, action: PayloadAction<Pageable>) => {
            state.pageRequest = { ...state.pageRequest, page: action.payload.page, perPage: action.payload.perPage }
        },
        PRODUCTS_SHOW_MORE_FETCH_RESPONSE_SUCCESS: (state, action) => {
            state.allProducts = {
                content: [...state?.allProducts.content, ...action.payload.content],
                page: action.payload.currentPage,
                perPage: state.allProducts.perPage,
                totalPages: state.allProducts.totalPages,
                orderedColumns: state.allProducts.orderedColumns
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
        UPDATE_PER_PAGE: (state, action) => {
            state.pageRequest.perPage = action.payload;
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
    UPDATE_PER_PAGE,
    DETAILS_FETCH_REQUESTED,
    DETAILS_FETCH_RESPONSE_SUCCESS,
    FAVORITE_PRODUCTS_FETCH_REQUESTED,
    FAVORITE_PRODUCTS_FETCH_RESPONSE_SUCCESS
} = products.actions;
export default products.reducer;