import { createSlice } from '@reduxjs/toolkit';
import {Orders} from '@/lib/models';

interface OrdersState {
    orders: Orders[];
    currentOrders: Orders[],
    allOrders: Orders[],
    lastCreatedOrder: Orders | null
}

const initialState: OrdersState = {
    orders: [],
    currentOrders: [],
    allOrders: [],
    lastCreatedOrder: null
};

const orders = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        CREATE_ORDER_REQUEST: () => {},
        CREATE_ORDER_RESPONSE_SUCCESS: (state, action) => {
            state.lastCreatedOrder = action.payload;
        },
        CURRENT_ORDERS_REQUEST: () => {},
        CURRENT_ORDERS_RESPONSE_SUCCESS: (state, action) => {
            state.currentOrders = action.payload;
        },
        ALL_ORDERS_REQUEST: () => {},
        ALL_ORDERS_RESPONSE_SUCCESS: (state, action) => {
            state.allOrders = action.payload
        }
    }
});

export const {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_RESPONSE_SUCCESS,
    CURRENT_ORDERS_REQUEST,
    CURRENT_ORDERS_RESPONSE_SUCCESS,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_RESPONSE_SUCCESS
} = orders.actions;
export default orders.reducer;