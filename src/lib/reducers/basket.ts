import { createSlice } from '@reduxjs/toolkit';
import {OrderItems} from '@/lib/models';

interface BasketState {
    orderItems: OrderItems[];
}

const initialState: BasketState = {
    orderItems: []
};

const basket = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        ORDER_ITEMS_INCREMENT: (state, action) => {

        },
        ORDER_ITEMS_INCREMENT_SUCCESS: (state, action) => {
            const index = state.orderItems.map(m => m.productId).indexOf(action.payload.productId);
            if (index == -1)
                state.orderItems.push(action.payload);
            else
                state.orderItems[index] = action.payload;
        },
        ORDER_ITEMS_DECREMENT: (state, action) => {

        },
        ORDER_ITEMS_DECREMENT_SUCCESS: (state, action) => {
            const index = state.orderItems.map(m => m.productId).indexOf(action.payload.productId);
            if (state.orderItems[index].quantity > 1)
                state.orderItems[index].quantity = action.payload.quantity;
            else
                state.orderItems.splice(index, 1);
        },
        REMOVE: (state, action) => {
            const index = state.orderItems.map(m => m.id).indexOf(action.payload);
            if (index !== -1) {
                state.orderItems.splice(index, 1);
            }
        },
        BASKET_CLEAR: (state) => {
            state.orderItems = [];
        },
        INITIAL_BASKET: (state) => {

        },
        INITIAL_BASKET_SUCCESS: (state, action) => {
            state.orderItems = action.payload
        },
        UPDATE_STORAGE: (state) => {

        },
        UPDATE_FOR_API: (state) => {

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
    UPDATE_FOR_API
} = basket.actions;
export default basket.reducer;