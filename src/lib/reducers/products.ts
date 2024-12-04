import { createSlice } from '@reduxjs/toolkit';

const products = createSlice({
    name: 'profile',
    initialState: {
        list: [{
            id: 1,
            name: 'Test 1',
            price: 200,
            currentQuantity: 0
        },{
            id: 2,
            name: 'Test 2',
            price: 200,
            currentQuantity: 300
        },{
            id: 3,
            name: 'Test 3',
            price: 200,
            currentQuantity: 300
        },{
            id: 4,
            name: 'Test 4',
            price: 200,
            currentQuantity: 300
        },{
            id: 5,
            name: 'Test 5',
            price: 200,
            currentQuantity: 300
        },]
    },
    reducers: {
        SET_NAME: (state, action) => {
            // state.name = action.payload;
        }
    }
});

export const { SET_NAME } = products.actions;
export default products.reducer;