import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/CartSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
