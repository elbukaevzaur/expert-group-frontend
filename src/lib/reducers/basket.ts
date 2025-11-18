import { createSlice } from '@reduxjs/toolkit';
import {OrderItems, OrderItemsDetails} from '@/lib/models';

interface BasketState {
    orderItems: OrderItems[];
    orderItemsDetails: OrderItemsDetails[];
}

const initialState: BasketState = {
    orderItems: [],
    orderItemsDetails: []
};

const basket = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        ORDER_ITEMS_INCREMENT: (state, action) => {},
        ORDER_ITEMS_INCREMENT_SUCCESS: (state, action) => {
            const index = state.orderItems.map(m => m.productId).indexOf(action.payload.productId);
            if (index == -1)
                state.orderItems.push(action.payload);
            else
                state.orderItems[index] = action.payload;
        },
        ORDER_ITEMS_DECREMENT: (state, action) => {},
        ORDER_ITEMS_DECREMENT_SUCCESS: (state, action) => {
            const index = state.orderItems.map(m => m.productId).indexOf(action.payload.productId);
            if (state.orderItems[index].quantity > 1)
                state.orderItems[index].quantity = action.payload.quantity;
            else
                state.orderItems.splice(index, 1);
        },
        REMOVE: (state, action) => {
            const index = state.orderItems.map(m => m.productId).indexOf(action.payload);
            if (index !== -1) {
                state.orderItems.splice(index, 1);
            }
        },
        BASKET_CLEAR: (state) => {
            state.orderItems = [];
        },
        INITIAL_BASKET: () => {},
        INITIAL_BASKET_SUCCESS: (state, action) => {
            state.orderItems = action.payload
        },
        UPDATE_STORAGE: () => {},
        UPDATE_FOR_API: () => {},
        ORDER_ITEMS_DETAILS_REQUEST: () => {},
        ORDER_ITEMS_DETAILS_RESPONSE_SUCCESS: (state, action) => {
            const detailsMap = action.payload.reduce((acc: any, itemDetails: OrderItemsDetails) => {
                acc[itemDetails.productId] = {
                    productId: itemDetails.productId,
                    name: itemDetails.name,
                    price: itemDetails.price,
                    currentQuantity: itemDetails.currentQuantity,
                    logo: itemDetails.logo,
                    parentCategoryId: itemDetails.parentCategoryId,
                    categoryId: itemDetails.categoryId,
                    defaultImage: itemDetails.defaultImage,
                    slug: itemDetails.slug,
                    allowOrderWithoutStock: itemDetails.allowOrderWithoutStock
                };
                return acc;
            }, {});
            state.orderItemsDetails = detailsMap;
        }
    }
});

export const {
    ORDER_ITEMS_INCREMENT,
    ORDER_ITEMS_INCREMENT_SUCCESS,
    ORDER_ITEMS_DECREMENT,
    ORDER_ITEMS_DECREMENT_SUCCESS,
    REMOVE,
    BASKET_CLEAR,
    INITIAL_BASKET,
    INITIAL_BASKET_SUCCESS,
    UPDATE_STORAGE,
    UPDATE_FOR_API,
    ORDER_ITEMS_DETAILS_REQUEST,
    ORDER_ITEMS_DETAILS_RESPONSE_SUCCESS
} = basket.actions;
export default basket.reducer;