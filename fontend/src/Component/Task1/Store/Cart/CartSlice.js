import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      const existingItem = state.find((user) => user.id === action.payload.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },
    removeFromCart(state, action) {
      return state.filter((user) => user.id !== action.payload.id);
    },
    increaseQty(state, action) {
      const user = state.find((user) => user.id === action.payload);
      if (user) user.qty += 1;
    },
    decreaseQty(state, action) {
      const user = state.find((user) => user.id === action.payload);
      if (user && user.qty > 1) user.qty -= 1;
    },
  },
});

export const { addTocart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;

export default cartSlice.reducer;
