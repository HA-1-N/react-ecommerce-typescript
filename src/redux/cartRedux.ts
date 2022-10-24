import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  products?: any;
  total?: number | any;
  quantity?: number | any;
}

const initialState: CartState = {
  products: [],
  total: 0,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => initialState,
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    // removeProduct: (state, action) => {
    //   state.quantity =
    //     state.quantity > 0
    //       ? state.quantity - action.payload.quantity
    //       : state.quantity;
    //   state.products.push(action.payload);
    //   state.total -= action.payload.price * action.payload.quantity;
    // },
  },
});

export const {
  addProduct,
  // removeProduct
  reset,
} = cartSlice.actions;
export default cartSlice.reducer;
