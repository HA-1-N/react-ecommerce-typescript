import { createSlice } from '@reduxjs/toolkit';

interface CartState {
    products?: any;
    total?: number;
    quantity?: number;
}

const initialState: CartState = {
    products: [],
    total: 0,
    quantity: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.quantity = action.payload.quantity + 1;
            state.products.push(action.payload.product);
            state.total += action.payload.price;
        }
    }
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer