import { createSlice } from '@reduxjs/toolkit';
import {BasketItem} from '@/lib/models';

interface BasketState {
    allItems: BasketItem[];
}

const initialState: BasketState = {
    allItems: []
};

const basket = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        ADD_SAVE: (state, action) => {

        },
        ADD_SAVED: (state, action) => {
            const index = state.allItems.map(m => m.id).indexOf(action.payload.id);
            const basketItem: BasketItem = {
                ...action.payload,
                count: 1
            }
            if (index == -1)
                state.allItems.push(basketItem);
            else
                basketItem.count = (state.allItems[index].count + 1);
                state.allItems[index] = basketItem;
        },
        REMOVE_COUNT: (state, action) => {
            const index = state.allItems.map(m => m.id).indexOf(action.payload.id);
            if (state.allItems[index].count > 1)
                state.allItems[index].count--;
            else
                state.allItems.splice(index, 1);
        },
        REMOVE: (state, action) => {
            const index = state.allItems.map(m => m.id).indexOf(action.payload);
            if (index !== -1) {
                state.allItems.splice(index, 1);
            }
        },
        REMOVE_ALL: (state) => {
            state.allItems = [];
        },
        INITIAL_BASKET: (state) => {

        },
        INITIAL_BASKET_SUCCESS: (state, action) => {
            state.allItems = action.payload
        }
    }
});

export const {
    ADD_SAVE,
    ADD_SAVED,
    REMOVE_COUNT,
    REMOVE,
    REMOVE_ALL,
    INITIAL_BASKET,
    INITIAL_BASKET_SUCCESS
} = basket.actions;
export default basket.reducer;