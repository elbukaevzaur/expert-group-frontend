import { createSlice } from '@reduxjs/toolkit';
import { Product } from '@/lib/models';

interface BasketState {
    allItems: Product[];
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
            state.allItems.push(action.payload);
        },
        REMOVE: (state, action) => {
            const index = state.allItems.map(m => m.id).indexOf(action.payload);
            console.log(index)
            if (index !== -1) {
                state.allItems.splice(index, 1);
            }
        },
        REMOVE_ALL: (state) => {
            state.allItems = [];
        },
    }
});

export const {
    ADD_SAVE,
    ADD_SAVED,
    REMOVE,
    REMOVE_ALL
} = basket.actions;
export default basket.reducer;