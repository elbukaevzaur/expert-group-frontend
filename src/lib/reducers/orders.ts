import { createSlice } from '@reduxjs/toolkit';
import {Orders} from '@/lib/models';

interface OrdersState {
    orders: Orders[];
}

const initialState: OrdersState = {
    orders: []
};

const orders = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        CREATE_ORDER_REQUEST: () => {},
        CREATE_ORDER_RESPONSE_SUCCESS: (state, action) => {
        },
    }
});

export const {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_RESPONSE_SUCCESS
} = orders.actions;
export default orders.reducer;